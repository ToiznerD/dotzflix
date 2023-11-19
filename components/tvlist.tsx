import React from 'react';
import { isEmpty } from 'lodash'
import TVCard from './tvcard';

interface TVListProps {
    data: Record<string, any>[];
    title: string;
}
const TVList:React.FC<TVListProps> = ({ data, title }) => {
    if (isEmpty(data)) {
        return null;
    }
    return (
        <div className="px-4 md:px-12 mt-10 space-y-8">
            <div>
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                    {title}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-4">
                    {data.map((tv) => (
                        <TVCard key={tv.id} data={tv} />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default TVList;