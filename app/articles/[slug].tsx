import { GetStaticProps, GetStaticPaths } from 'next';
import { getArticleBySlug, markdownToHtml } from '../../lib/markdown';

interface ArticleProps {
  content: string;
}

export default function Article({ content }: ArticleProps) {
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const article = getArticleBySlug(params?.slug as string);
  const content = await markdownToHtml(article.content || '');

  return {
    props: {
      content,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = getAllArticles();
  const paths = articles.map((article) => ({
    params: { slug: article.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};
