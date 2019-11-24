export const data = {
    blocks: [
        {
            text: "The editor is based on the draft-js.",
            type: "unstyled",
        },
        {
            text: (
                "It also support inline style which color, font-size, bold, Italic, underline, strikethrough, code, and even link(draft-js)."
            ),
            type: 'unstyled',
            inlineStyleRanges: [
                { offset: 35, length: 5, style: "color-rgb(97,189,109)" },
                { offset: 42, length: 9, style: "fontSize-30" },
                { offset: 53, length: 4, style: "BOLD" },
                { offset: 59, length: 6, style: "ITALIC" },
                { offset: 67, length: 9, style: "UNDERLINE" },
                { offset: 78, length: 13, style: "STRIKETHROUGH" },
                { offset: 93, length: 4, style: "CODE" },
            ],
            entityRanges: [{offset: 108, length: 13, key: "0"}],
        },
        {
            text: "",
            type: "unstyled",
        },
        {
            text: "text-align: center",
            type: "unstyled",
            data: {
                "text-align": "center"
            }
        },
        {
            text: "",
            type: "unstyled",
        },
        {
            text: (
                "I'm a \"head-one\" title block"
            ),
            type: "header-one",
        },
        {
            text: "",
            type: "unstyled",
        },
        {
            text: "A item of unorderlist",
            type: "unordered-list-item",
        },
        {
            text: 'B item of unorderlist',
            type: "unordered-list-item",
        },
        {
            text: "",
            type: "unstyled",
        },
        {
            text: "I am a blockqoute.",
            type: "blockquote",
        },
        {
            text: " ",
            type: "atomic",
            entityRanges: [{offset: 0, length: 1, key: "first"}],
        },
        {
            text: "",
            type: "unstyled",
        },
        {
            text: " ",
            type: "atomic",
            entityRanges: [{offset: 0, length: 1, key: "second"}],
        },
        {
            text: "",
            type: "unstyled",
        },
        {
            text: " ",
            type: "atomic",
            entityRanges: [{offset: 0, length: 1, key: "third"}],
        },
        {
            text: "",
            type: "unstyled",
        },
    ],

    entityMap: {
        0: {
            "type": "LINK",
            "mutability": "MUTABLE",
            "data": {
                "href": "https://github.com/facebook/draft-js"
            }
        },
        first: {
            type: "atomic:image",
            mutability: "MUTABLE",
            data: {
                src: "http://placehold.it/350x150?text=hello+world"
            }
        },
        second: {
            type: "atomic:video",
            mutability: "MUTABLE",
            data: {
                src: "https://www.youtube.com/embed/feUYwoLhE_4"
            }
        },
        third: {
            type: "atomic:insert",
            mutability: "MUTABLE",
            data: {
                id: "1",
                content: "I am the third, type is atomic:insert"
            }
        },
    },
};

