import "leaflet/dist/leaflet.css";

import L from "leaflet";

import { useToast } from "@/hooks/use-toast";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
  Popup,
  Circle,
} from "react-leaflet";

import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

const MapComponent = ({
  onPosition,
  defaultPositions,
  label,
  readOnly = false,
  variant = "default",
}) => {
  const [positions, setPositions] = useState(defaultPositions || []);
  const [distances, setDistances] = useState([]);
  const [hoverPosition, setHoverPosition] = useState(null);

  const { toast } = useToast();

  const calculateDistance = (pos1, pos2) => {
    const latlng1 = L.latLng(pos1);
    const latlng2 = L.latLng(pos2);
    return latlng1.distanceTo(latlng2);
  };

  const calculateCumulativeDistance = (index) => {
    return distances.slice(0, index).reduce((sum, dist) => sum + dist, 0);
  };

  const MapClickHandler = () => {
    if (readOnly) {
      return null;
    }

    useMapEvents({
      click(e) {
        const newPoint = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        };

        if (positions.length > 0) {
          const lastPoint = positions[positions.length - 1];
          const distance = calculateDistance(lastPoint, newPoint);

          if (distance >= 1001) {
            toast({
              title: "خطا",
              description: "فاصله بین نقاط نباید بیشتر از 1 کیلومتر باشد.",
              variant: "destructive",
            });
            return;
          }
        }

        const newPositions = [...positions, newPoint];

        const newDistances = [];

        for (let i = 1; i < newPositions.length; i++) {
          const distance = calculateDistance(
            newPositions[i - 1],
            newPositions[i]
          );

          newDistances.push(distance);
        }

        setPositions(newPositions);
        setDistances(newDistances);
        setHoverPosition(null);
      },
      mousemove(e) {
        if (positions.length > 0) {
          setHoverPosition([e.latlng.lat, e.latlng.lng]);
        }
      },
    });
    return null;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant={variant}>
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] lg:max-w-[650px] pt-10">
        <MapContainer
          center={[35.6892, 51.389]}
          zoom={6}
          style={{ height: "500px", width: "100%", borderRadius: 15 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapClickHandler />

          {positions.map((pos, index) => (
            <Marker key={index} position={pos}>
              {!readOnly && (
                <Popup>
                  <strong>نقطه {index + 1}</strong>
                  {index > 0 && (
                    <div>
                      فاصله از نقطه قبلی :{" "}
                      {(distances[index - 1] / 1000).toFixed(2)} km
                      <br />
                      جمع کل فواصل :{" "}
                      {(calculateCumulativeDistance(index) / 1000).toFixed(
                        2
                      )}{" "}
                      km
                    </div>
                  )}
                </Popup>
              )}
            </Marker>
          ))}

          {positions.length > 0 && !readOnly && (
            <Circle
              center={positions[positions.length - 1]}
              radius={1000}
              color="blue"
              fillOpacity={0.1}
            />
          )}

          <Polyline positions={positions} color="blue" />

          {hoverPosition && positions.length > 0 && (
            <Polyline
              positions={[positions[positions.length - 1], hoverPosition]}
              color="red"
              weight={2}
              dashArray="5, 10"
            />
          )}

          {hoverPosition && positions.length > 0 && (
            <Popup position={hoverPosition}>
              <strong>فاصله کلی : </strong>
              <br />
              {(
                (calculateCumulativeDistance(positions.length) +
                  calculateDistance(
                    positions[positions.length - 1],
                    hoverPosition
                  )) /
                1000
              ).toFixed(2)}{" "}
              کیلومتر
            </Popup>
          )}
        </MapContainer>

        {!readOnly && defaultPositions?.length > 0 && (
          <Button onClick={() => setPositions([])}>
            پاک کردن کل نقاط و شروع دوباره
          </Button>
        )}

        {!readOnly && (
          <DialogClose asChild>
            <Button onClick={() => onPosition(positions)}>ثبت</Button>
          </DialogClose>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MapComponent;
