import { getShow } from "../../lib/tvmaze.js";
import { TVShow } from "../../models/TVShow.js"

class TVShowService {
    async get(id) {
        const selectFields = 'id name cast';
        let show = await TVShow.findOne({ id }).select(selectFields);

        if (!show) {
            show = await getShow(id);

            if(!show) {
                return {
                    error: "Show not found"
                }
            }
            show = await TVShow.create(show);
            show = {
                id: show.id,
                name: show.name,
                cast: show.cast
            }
        }

        if (!show) {
            return {
                error: "Show not found"
            }
        }
        return show;
    }
}

const service = new TVShowService();
export default {service, url : "/shows"};