# backend

## Dostępne endpointy w prototypie
> [GET] api/rooms

Parametry filtrujące: 
 - priceMin (number)
 - priceMax (number)
 - capacity (number | undefined)
 - standard (string | undefined)

Typ zwracany:
```
Room {
	number: string;
	image: string;
	standard: string;
	pricePerNight: number;
	capacity: number;
	description: string;
}
```
> [GET] api/rooms/images

Parametry filtrujące: 
 - roomId (number)

Typ zwracany:
```
RoomImage {
	image: string;
	description: string;
}
```