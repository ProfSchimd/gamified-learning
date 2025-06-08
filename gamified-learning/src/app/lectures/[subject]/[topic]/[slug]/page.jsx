import { getLecture, getAllLectureSlugs } from "@/lib/lecture-loader";

export async function generateStaticParams() {
    const allLectures = getAllLectureSlugs();
    return allLectures.map(({ subject, topic, slug }) => (
        { subject, topic, slug }
    ));
}

export default async function LecturePage({ params }) {
    const {subject, topic, slug} = await params;
    const { content, frontmatter } = await getLecture(subject, topic, slug);
    
    return (
        <div className="mx-auto prose w-full dark:prose-invert">
            <article>
                <h1 className="border-b-1 dark:border-gray-200 w-full">{frontmatter.title}</h1>
                {content}
            </article>
        </div>
    )
}