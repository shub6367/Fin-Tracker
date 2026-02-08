// Re-declare the types from global.d.ts for proper module exports
export type UserForNewsEmail = {
    id: string;
    name: string;
    email: string;
};

export type MarketNewsArticle = {
    id: number;
    headline: string;
    summary: string;
    source: string;
    url: string;
    datetime: number;
    category: string;
    related: string;
    image?: string;
};
