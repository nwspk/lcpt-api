import { Router, Request, Response } from 'express'
import expressAsyncHandler = require('express-async-handler');
import Campus from 'src/models/Campus.model';
import ical from "ical";
import requestPromise = require('request-promise-native');

const router = Router()

async function getCalEvents(url: string) {
    const ics = await requestPromise.get(url.replace('webcal://', 'http://'));
    const events = ical.parseICS(ics);
    return events;
}

const eventsCache = {
    updatedAt: 0,
    events: [] as any[],
};

const FIVE_MINUTES = 1000 * 60 * 5;
async function getEvents(campuses: Campus[]) {
    let allEvents;
    if (eventsCache.updatedAt < (Date.now() - FIVE_MINUTES)) {
        console.log(`Events cache invalidated, re-fetching`);
        const calUrls = campuses.map(campus => campus.calendarUrl).filter(a => a);
        const calendars = await Promise.all(
            calUrls.map(getCalEvents)
        );
        allEvents = calendars
            .flatMap(cal => Object.values(cal))
            .sort((a, b) => a.start < b.start ? 1 : -1);
    } else {
        console.log(`Reading events from cache`);
        allEvents = eventsCache.events;
    }

    const now = new Date();
    const pastIndex = allEvents.findIndex(ev => ev.end < now);
    const futureEvents = allEvents.slice(0, pastIndex);
    const pastEvents = allEvents.slice(pastIndex);

    return {
        futureEvents,
        pastEvents,
    }
}

router.get(
    '/college.json',
    expressAsyncHandler(async (req: Request, res: Response) => {
        const [
            campuses
        ] = await Promise.all([
            Campus.find({ relations: ['dean'] })
        ]);

        const events = await getEvents(campuses);

        res.send({
            campuses,
            events,
        });
    })
);

export default router
