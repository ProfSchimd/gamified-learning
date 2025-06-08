import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export async function getLecture(subject, topic, slug) {
    const filePath = path.join(process.cwd(), "data/lectures", subject, topic, `${slug}.mdx`);
    const source = fs.readFileSync(filePath, "utf8");

    return await compileMDX({
        source,
        options: { 
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkMath],
                rehypePlugins: [rehypeKatex],
            }
        },
    });
}

const lecturesDir = path.join(process.cwd(), "data", "lectures");

export function getAllLectureSlugs() {
    const subjects = fs.readdirSync(lecturesDir);
    const slugs = [];

    subjects.forEach((subject) => {
        const subjectPath = path.join(lecturesDir, subject);
        const topics = fs.readdirSync(subjectPath);

        topics.forEach((topic) => {
            const topicPath = path.join(subjectPath, topic);
            const files = fs.readdirSync(topicPath);

            files.forEach((file) => {
                if (file.endsWith(".mdx")) {
                    const slug = file.replace(/\.mdx$/, "");
                    slugs.push({
                        subject,
                        topic,
                        slug,
                    });
                }
            });
        });
    });

    return slugs;
}