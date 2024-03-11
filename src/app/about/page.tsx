import fs from 'fs';
import Markdown from 'markdown-to-jsx';

const AboutPage = () => {
    const content = fs.readFileSync('public/about.md', 'utf8');
    
    return (
        <div className="w-full flex justify-center font-sometype">
            <div className="w-1/2 mt-20">
                <Markdown className="prose text-xs m-auto">{content}</Markdown>
            </div>
        </div>
    );
  }
  
  export default AboutPage;