import httpService from "./http.service"

const todosEndpoint = "todos/"

const todosService = {
    fetch: async()=> {
        const {data} = await httpService.get(todosEndpoint, {
            params: {
                _page: 1,
                _limit: 3
            }
        })
        return data
    },
    create: async (state) => {
        const {data} = await httpService.post(todosEndpoint, {
                completed: false,
                title: `Task ${state.length+1}`,
        })
        return data
    }
}

export default todosService