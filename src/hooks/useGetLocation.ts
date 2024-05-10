export interface ILocation {
    latitude: string;
    longitude: string;
}

export const useGetLocation = () => {
    let isFetched = false;
    if (isFetched === false) {
        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition((position) => {
                isFetched = true;
                resolve({
                    latitude: position.coords.latitude.toString(),
                    longitude: position.coords.longitude.toString(),
                });
            });
        });
    }
};
