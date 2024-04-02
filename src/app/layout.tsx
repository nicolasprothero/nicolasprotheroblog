import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import fs from 'fs';
import matter from 'gray-matter';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "haseblog",
  description: "blog belonging to nicolas hase prothero",
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
            <div className="flex flex-row text-xs m-2 hover:opacity-50">
              <p className="pr-2 w-52">{metadata.title}</p>
              <p>{metadata.dateString}</p>
            </div>
          </Link>
        </div>
      );
    }
  });

  const header = (
      <header className="p-2 w-screen flex justify-between">
        <div className="w-64">
          <Link href="/">
            <h1 className="text-xs font-bold">NICOLAS HASE PROTHERO'S BlOG</h1>
          </Link>
        </div>
        <div className="w-64 text-center">
          <Link href='/about'>
            <h1 className="text-xs font-bold hover:opacity-50">ABOUT ME</h1>
          </Link>
        </div>
        <div className="w-64 text-right">
          <a href="https://nicolasprothero.com/"><h1 className="text-xs font-bold hover:opacity-50">MY WEBSITE</h1></a>
        </div>
      </header>
  );

  const footer = (
    <footer className="fixed inset-x-0 bottom-0 flex items-center justify-center">
      <h1 className="text-xs m-auto opacity-25 pb-2">NICOLAS HASE PROTHERO 2024</h1>
    </footer>
  );

  const postList = (
    <>
      <h1 className="Times text-xs ml-2 opacity-25">Index</h1>
      <div className="overflow-y-auto h-144">
        <h1 className='Times'>{postPreview}</h1>
      </div>
    </>
  );

  const sidebar = (
    <div>
      <div className="fixed">
        {header}
        <div className="mb-6 w-72 ">
          <p className="text-xs ml-2 mt-2 Times">A website that allows my writings to live on the web. These low writings are typically short thoughts that come to mind or some explanations about select works. Thanks much for stopping by.</p>
        </div>
        {postList}
        {footer}
      </div>
    </div>
  );

  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        {sidebar}
        {children}
      </body>
    </html>
  );
}
