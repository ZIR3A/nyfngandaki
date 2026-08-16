export function generateSEO({ title, description, url, locale = "en", image }) {
  const baseTitle = "NYFN Gandaki Province";

  // Handle if title is an object (localized) or a string
  let resolvedTitle = baseTitle;
  if (title) {
    if (typeof title === 'string') {
      resolvedTitle = `${title} | ${baseTitle}`;
    } else {
      resolvedTitle = title[locale] ? `${title[locale]} | ${baseTitle}` : baseTitle;
    }
  }

  // Handle if description is an object (localized) or a string
  let resolvedDescription = "Official Website of National Youth Federation Nepal - Gandaki Province";
  if (description) {
    if (typeof description === 'string') {
      resolvedDescription = description;
    } else if (description[locale]) {
      resolvedDescription = description[locale];
    }
  }

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: url || "https://nyfngandaki.org",
      siteName: baseTitle,
      images: ["/brand-logo.png"],
      locale: locale === "np" ? "ne_NP" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: ["/brand-logo.png"],
    },
  };
}
