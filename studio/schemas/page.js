export default {
    name: "page",
    title: "Page",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required()
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            validation: (Rule) => Rule.required(),
            options: {
                source: doc => `${doc.title}`,
            },
        },
        {
            name: "content",
            type: "array",
            title: "Content",
            of: [
                {type: "block"},
                {type: "image"},
            ]
        }
    ]
}