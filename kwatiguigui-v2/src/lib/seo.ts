import type { Metadata } from "next";

/**
 * Generate JSON-LD structured data for an Organization.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KUSSALA",
    url: "https://kussala.org",
    logo: "https://kussala.org/images/logo.png",
    description:
      "Premiere plateforme d'emploi de la Republique Centrafricaine.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangui",
      addressCountry: "CF",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+236-74-14-34-34",
      contactType: "customer service",
      availableLanguage: "French",
    },
    sameAs: ["https://wa.me/23674143434"],
  };
}

/**
 * Generate JSON-LD structured data for a JobPosting.
 */
export function jobPostingJsonLd(job: {
  id: string;
  title: string;
  description: string;
  city: string;
  datePosted: string;
  expiresAt: string;
  userType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    identifier: {
      "@type": "PropertyValue",
      name: "KUSSALA",
      value: job.id,
    },
    datePosted: job.datePosted,
    validThrough: job.expiresAt,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "KUSSALA",
      sameAs: "https://kussala.org",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.city,
        addressCountry: "CF",
      },
    },
  };
}

/**
 * Generate JSON-LD structured data for BreadcrumbList.
 */
export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate common SEO metadata for a page.
 */
export function generatePageMetadata({
  title,
  description,
  path,
  ogImage,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const url = `https://kussala.org${path}`;
  const image = ogImage ?? "/images/og-default.png";

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | KUSSALA`,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | KUSSALA`,
      description,
      images: [image],
    },
  };
}
