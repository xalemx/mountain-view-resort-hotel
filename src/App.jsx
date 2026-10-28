import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster"
import RouteFallback from '@/components/RouteFallback';
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ProtectedRoute from '@/components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import WelcomeGate from '@/components/site/WelcomeGate';
import LanguageRoutes from '@/components/site/LanguageRoutes';
import LanguageUrlSync from '@/components/site/LanguageUrlSync';
import { LanguageProvider } from '@/lib/LanguageContext';
import { PropertyProvider } from '@/lib/PropertyContext';
import { OfferRequestProvider } from '@/lib/OfferRequestContext';
import OfferRequestHost from '@/components/site/OfferRequestHost';
import Home from '@/pages/Home';

// Only the front page is carried by the first load. Every other page — the two
// houses, the menu, the guide — arrives in its own file when it is opened, so a
// visitor reading the front page never downloads the whole site first.
const Property = lazy(() => import('@/pages/Property'));
const RestaurantMenu = lazy(() => import('@/pages/RestaurantMenu'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Guide = lazy(() => import('@/pages/Guide'));
const GuidePlace = lazy(() => import('@/pages/GuidePlace'));
const GuideItinerary = lazy(() => import('@/pages/GuideItinerary'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));

// The sign-in screens and the owner's dashboard load on demand: a guest reading
// the site never downloads them.
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));
const OwnerProperty = lazy(() => import('@/pages/OwnerProperty'));
const OwnerDashboard = lazy(() => import('@/pages/OwnerDashboard'));
// Add page imports here

const AuthenticatedApp = () => {
  const { authError, navigateToLogin } = useAuth();

  // The public pages render immediately, without waiting for the account check:
  // a guest — and a search engine reading the page — gets the houses, the guide
  // and the contact details straight away. The owner's dashboard guards itself.
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      {/* One page, four addresses. The public pages are registered twice: at the
          root in English (/guide) and under a language prefix (/ru/guide), so
          each language can be linked, shared and indexed on its own. */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/guide/three-days-in-gusinje" element={<GuideItinerary />} />
      <Route path="/guide/:slug" element={<GuidePlace />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/owner/property" element={<OwnerProperty />} />
      <Route path="/mountain-view-resort" element={<Property propertyId="resort" />} />
      <Route path="/hotel-mountain-view" element={<Property propertyId="inn" />} />
      <Route path="/mountain-view-resort/restaurant" element={<RestaurantMenu />} />
      <Route path="/:lang" element={<LanguageRoutes />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="guide" element={<Guide />} />
        <Route path="guide/three-days-in-gusinje" element={<GuideItinerary />} />
        <Route path="guide/:slug" element={<GuidePlace />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="mountain-view-resort" element={<Property propertyId="resort" />} />
        <Route path="hotel-mountain-view" element={<Property propertyId="inn" />} />
        <Route path="mountain-view-resort/restaurant" element={<RestaurantMenu />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login?returnTo=%2Fowner" replace />} />}
      >
        <Route path="/owner" element={<OwnerDashboard />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <LanguageProvider>
      <PropertyProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <LanguageUrlSync />
          {/* The language chooser sits above the content on a first visit, never
              in front of it, so the page is readable without clicking it. */}
          <WelcomeGate />
          {/* The routed pages arrive in their own chunks, so a first visit carries
              the site itself and nothing an owner would use. */}
          {/* Every offer button on the site opens the one request dialog, and the
              dialog can hand its details to the request form. */}
          <OfferRequestProvider>
            <Suspense fallback={<RouteFallback />}>
              <AuthenticatedApp />
            </Suspense>
            <OfferRequestHost />
          </OfferRequestProvider>
        </Router>
        <Toaster />
      </QueryClientProvider>
      </PropertyProvider>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App