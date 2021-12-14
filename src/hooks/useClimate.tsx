import { useState } from 'react'
import climateApi from '../api/climateApi';
import { Channel, Climate, Feed } from '../interfaces/ClimateInterface';
import { useEffect } from 'react';

const FeedProps = {
    created_at: "",
    entry_id:   0,
    field1:     "",
    field2:     "",
    field3:     "",
    field4:     "",
    field5:     "",
    field6:     ""
}

const ChanelProps = {
    id:            0,   
    name:          "",
    description:   "",
    latitude:      "",
    longitude:     "",
    field1:        "",
    field2:        "",
    field3:        "",
    field4:        "",
    field5:        "",
    field6:        "",
    created_at:    "",
    updated_at:    "",
    last_entry_id: 0
}

export const useClimate = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [feed, setFeed] = useState<Feed[]>([FeedProps]);
    const [channel, setChannel] = useState<Channel>(ChanelProps);

    const getClimate = async () => {
        const response = await climateApi.get<Climate>("/");
        setFeed(response.data.feeds);
        setChannel(response.data.channel);

        setIsLoading(false);
    }
    useEffect(() => {
        getClimate();
        setInterval(getClimate, 60000);
    }, []);

    return {
        feed,
        channel,
        isLoading
    }
}
