import { Toaster } from "@/components/ui/toaster"
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
import Home from '@/pages/Home';
import Property from '@/pages/Property';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Guide from '@/pages/Guide';
import Privacy from '@/pages/Privacy';
import OwnerDashboard from '@/pages/OwnerDashboard';
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
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/mountain-view-resort" element={<Property propertyId="resort" />} />
      <Route path="/hotel-mountain-view" element={<Property propertyId="inn" />} />
      <Route path="/:lang" element={<LanguageRoutes />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="guide" element={<Guide />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="mountain-view-resort" element={<Property propertyId="resort" />} />
        <Route path="hotel-mountain-view" element={<Property propertyId="inn" />} />
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
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
      </PropertyProvider>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App