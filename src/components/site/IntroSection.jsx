import React from "react";

export default function IntroSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="section">
        <div className="max-w-3xl">
          <p className="eyebrow">Welcome</p>
          <h2 className="mt-4 font-heading text-3xl leading-tight text-primary md:text-[2.6rem]">
            A quiet base at the foot of the Accursed Mountains
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Mountain View is family-run, in a small town on the edge of Prokletije National Park. One property is a
            resort with a garden and room for everyone; the other is an inn in the town centre for people travelling
            light. Both are a few minutes from the bakery, ten minutes from the trailheads, and a world away from the
            crowds on the coast.
          </p>
        </div>
      </div>
    </section>
  );
}