import React from "react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/site/SectionHeading";
import RoomTypeCard from "@/components/site/RoomTypeCard";
import { useLanguage } from "@/lib/LanguageContext";
import { useOfferRequest } from "@/lib/OfferRequestContext";
import { galleryFor } from "@/lib/galleryPhotos";
import { ROOM_FEATURES, ROOM_FEATURES_LABEL, ROOM_TYPES } from "@/lib/roomTypes";

// The accommodation, shown with the photographs we actually have.
//
// At the resort the types are listed by name, beds and size, and one of our own
// photographs of the bungalows stands beside them: no photograph of each type on
// its own exists, so none is presented as one. The hotel's rooms are shown with
// the photographs taken in them, each under the description it was saved with.
export default function PropertyRooms({ property }) {
  const { t, language } = useLanguage();
  const { openOffer } = useOfferRequest();
  const copy = t.property[property.id];

  const types = ROOM_TYPES[language] || ROOM_TYPES.en;
  const features = ROOM_FEATURES[language] || ROOM_FEATURES.en;
  const featuresLabel = ROOM_FEATURES_LABEL[language] || ROOM_FEATURES_LABEL.en;

  const captions = t.gallery.captions;
  const photos = galleryFor(property.id).photos;
  const bungalowPhoto = photos.find((photo) => photo.key === "river");
  const roomPhotos = photos.filter((photo) => photo.key.startsWith("room_"));
  const isResort = property.id === "resort";

  return (
    <section id="rooms" className="border-t border-border/60 py-20 md:py-28">
      <div className="section">
        <SectionHeading eyebrow={t.property.roomsEyebrow} title={t.property.roomsTitle} />
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground">{copy.rooms}</p>

        {isResort ? (
          <>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {types.map((room) => (
                <RoomTypeCard key={room.id} room={room} />
              ))}
            </div>

            {bungalowPhoto ? (
              <figure className="mt-6">
                <Image src={bungalowPhoto.src} alt={captions[bungalowPhoto.key]} className="h-64 w-full md:h-80" />
                <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {captions[bungalowPhoto.key]}
                </figcaption>
              </figure>
            ) : null}

            <div className="mt-6 rounded-sm border border-border/70 bg-secondary/40 p-6">
              <p className="eyebrow">{featuresLabel}</p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground">
                {features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {roomPhotos.map((photo) => (
              <figure key={photo.key} className="overflow-hidden rounded-sm border border-border/70 bg-card">
                <Image src={photo.src} alt={captions[photo.key]} loading="lazy" className="h-48 w-full" />
                <figcaption className="p-5 text-sm leading-relaxed text-foreground">{captions[photo.key]}</figcaption>
              </figure>
            ))}
          </div>
        )}

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">{t.property.roomsNote}</p>

        <button type="button" onClick={() => openOffer({ property: property.value })} className="btn-pill mt-8">
          {t.property.roomsCta} ↗
        </button>
      </div>
    </section>
  );
}