import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import fs from 'fs';
import matter from 'gray-matter';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hase Blog",
  description: "Generated by create next app",
};

const getPosts = () => {
  const folder = "posts/";
  const files = fs.readdirSync(folder);
  const onlyMarkdown = files.filter(file => file.endsWith('.md'));
  const slugs = onlyMarkdown.map(file => file.replace('.md', ''));
  return slugs;
};

const getPostContent = (slug: string) => {
  const folder = "posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, 'utf8');
  const { data } = matter(content);
  let dateString = '';
  if (data.date) {
    dateString = data.date instanceof Date ? data.date.toISOString() : data.date;
    dateString = dateString.split('T')[0];
  }
  return {
    title: data.title,
    date: data.date,
    tags: data.tags,
    dateString: dateString,
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const postData = getPosts();

  postData.sort((a, b) => {
    const metadataA = getPostContent(a);
    const metadataB = getPostContent(b);
    return new Date(metadataB.date).getTime() - new Date(metadataA.date).getTime();
  });

  const postPreview = postData.map((slug) => {
    const metadata = getPostContent(slug);
    if (!metadata.tags.includes('hidden')){
      return (
        <div className="w-72">
          <Link href={`/posts/${slug}`}>
            <div className="flex flex-row text-xs m-2 opacity-50 hover:text-blue-600 hover:opacity-100">
              <p className="pr-2 w-52">{metadata.title}</p>
              <p>{metadata.dateString}</p>
            </div>
          </Link>
        </div>
      );
    }
  });

  const header = (
      <header className="mb-6 w-72">
        <Link href="/">
          <h1 className="text-xs ml-2 mt-2 text-blue-600">NICOLAS HASE PROTHERO'S BlOG</h1>
          <p className="text-xs ml-2 mt-2 opacity-50">A website that allows my writings to live on the web. These low writings are typically short thoughts that come to mind or some explanations about select works. Thanks much for stopping by.</p>
        </Link>
      </header>
  );

  const footer = (
      <footer className="fixed inset-x-0 bottom-0 ml-2">
        <Link href='/about'>
          <h1 className="text-xs text-blue-600">ABOUT ME</h1>
        </Link>
        <a href="https://nicolasprothero.com/"><h1 className="text-xs text-blue-600">WEBSITE</h1></a>
        <h1 className="text-xs mt-2 mb-2 opacity-25">nicolas hase prothero 2024</h1>
      </footer>
  );

  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <div className="fixed">
          {header}
          <p className="Times m-2 text-xs">2024</p>
          <h1 className='Times'>{postPreview}</h1>
          {footer}
        </div>
        {children}
      </body>
    </html>
  );
}
