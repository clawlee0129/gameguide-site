import { seoConfig } from '@/data/site';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noIndex?: boolean;
}

export function SEOHead({
  title,
  description,
  canonical,
  ogImage = seoConfig.defaultImage,
  ogType = 'article',
  publishedTime,
  modifiedTime,
  tags,
  noIndex = false,
}: SEOHeadProps) {
  const fullTitle = `${title} | ${seoConfig.siteName}`;

  return (
    <>
      {/* Standard Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={tags?.join(', ')} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={`${seoConfig.siteUrl}${canonical}`} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={`${seoConfig.siteUrl}${canonical}`} />
      <meta property="og:image" content={`${seoConfig.siteUrl}${ogImage}`} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoConfig.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${seoConfig.siteUrl}${ogImage}`} />

      {/* Article Specific */}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
    </>
  );
}