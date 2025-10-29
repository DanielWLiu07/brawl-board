"use client"

interface BoardListProps {
    orgId: string;
    query: URLSearchParams;
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
    return (
        <div>
            <h2>Board List</h2>
            <p>Organization ID: {orgId}</p>
            <p>Search Query: {query.get("search")}</p>
            <p>Favorites: {query.get("favorites")}</p>
        </div>
    );
};