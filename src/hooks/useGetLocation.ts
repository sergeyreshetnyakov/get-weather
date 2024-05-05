export interface ILocation {
    latitude: string;
    longitude: string;
}

export const useGetLocation = () => {
    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition((position) =>
            resolve({
                latitude: position.coords.latitude.toString(),
                longitude: position.coords.longitude.toString(),
            })
        );
    });
};
