/* We only need one key as we are fetching the cdn static json so it can be cached, if we had more 
server filtering etc.. we would be able to add more keys to improve the reactQuery caching */
export const eventsKeys = {
  all: ['events'] as const,
};

