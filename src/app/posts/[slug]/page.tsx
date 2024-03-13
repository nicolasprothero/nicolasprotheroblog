import { ReactNode } from 'react';

import fs from 'fs';
import Markdown from 'markdown-to-jsx';

const getPostContent = (slug: string) => {
    const folder = "posts/";
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync(file, 'utf8');
    return content;
};

const PostPage = (props: any) => {
    const slug = props.params.slug;
    const content = getPostContent(slug);
    return (
        <div>
            <div className="w-full flex justify-center font-sometype">
                <div className="mt-20 mb-20 w-2/3">
                    <Markdown className="prose text-xs m-auto">{content}</Markdown>
                </div>
            </div>
        </div>

    );
}

export default PostPage;