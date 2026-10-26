import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuItems from "@/components/site/MenuItems";
import { useLanguage } from "@/lib/LanguageContext";
import { MENU, RESTAURANT_COPY } from "@/lib/menu";

// The menu itself. The sections sit across the top and open one at a time, which
// is what keeps a menu this long readable on a phone.
export default function MenuCategories() {
  const { language } = useLanguage();
  const copy = RESTAURANT_COPY[language] || RESTAURANT_COPY.en;

  return (
    <div>
      <Tabs defaultValue={MENU[0].id}>
        <TabsList
          aria-label={copy.categoriesLabel}
          className="flex h-auto flex-wrap items-center justify-start gap-2 rounded-sm bg-transparent p-0"
        >
          {MENU.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="min-h-[44px] rounded-full border border-border bg-background px-4 font-body text-[11px] uppercase tracking-[0.18em] text-muted-foreground shadow-none data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
            >
              {category.label[language] || category.label.en}
            </TabsTrigger>
          ))}
        </TabsList>

        {MENU.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-8">
            <h3 className="font-heading text-xl leading-snug text-primary md:text-2xl">
              {category.label[language] || category.label.en}
            </h3>
            <div className="mt-4">
              <MenuItems category={category} language={language} />
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <p className="mt-8 rounded-sm border border-border/70 bg-secondary/40 p-5 text-sm leading-relaxed text-foreground">
        {copy.allergens}
      </p>
    </div>
  );
}