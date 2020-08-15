import React, { useContext } from "react";
import ReactDOM from "../../node_modules/react-dom";
import TweetContext from "../Tweets/TweetContext";
const mapStyles = {
  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
};

export class CurrentLocation extends React.Component {
  static contextType = TweetContext;
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng,
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google != this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude,
            },
          });
        });
      }
    }
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      let { minZoom, maxZoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom,
          minZoom: minZoom,
          maxZoom: maxZoom,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#242f3e" }],
            },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#263c3f" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6b9a76" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#1f2835" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#f3d19c" }],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#2f3948" }],
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#17263c" }],
            },
          ],
        }
      );

      this.map = new maps.Map(node, mapConfig);
      const context = this.context;
      this.map.addListener("click", (event) => {
        // alert("clicked" + event.latLng);
        console.log(event);
        var latlng = event.latLng.toString().replace(/\(|\)/g, "").split(", ");
        fetch("http://127.0.0.1:8000/get_tweet", {
          method: "post",
          headers: { "Content-type": "application/json" },

          body: JSON.stringify({
            lat: latlng[0],
            lng: latlng[1],
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            context.setTweets([]);
            setTimeout(() => context.setTweets(data), 500);

            //context.setTweets(data);
          });

        this.reverseAddress(event.latLng, maps);
        this.placeMarkerAndPanTo(event.latLng, this.map, maps);
      });
      // const service = new maps.places.PlacesService(this.map);
      // var request = {
      //   placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
      //   fields: ["name", "rating", "formatted_phone_number", "geometry"],
      // };

      // service.getDetails(request, (place, status) => {
      //   if (status === maps.places.PlacesServiceStatus.OK) {
      //     this.map.addListener("click", (event) => {
      //       console.log(place.name);
      //     });
      //   }
      // });
      // this.getPlaceInfo(this.map, maps);
    }
  }

  reverseAddress(latLng, maps) {
    var geocoder = new maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      // alert(status);
      if (status === "OK") {
        alert(results[results.length - 2].address_components[0].long_name);
        // console.log(results);
      }
    });
  }

  getPlaceInfo(map, maps) {
    const service = new maps.places.PlacesService(map);
  }

  placeMarkerAndPanTo(latLng, map, maps) {
    var marker = new maps.Marker({
      position: latLng,
      map: map,
    });
    map.panTo(latLng);
  }

  renderChildren() {
    const { children } = this.props;
    if (!children) return;

    return React.Children.map(children, (c) => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation,
      });
    });
  }

  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  render() {
    const style = Object.assign({}, mapStyles.map);
    return (
      <div>
        {/* <TweetContext.Consumer></TweetContext.Consumer> */}
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}

export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 7,
  initCenter: {
    lat: 32.78,
    lng: -96.8,
  },
  minZoom: 5,
  maxZoom: 8,
  centerAroundCurrentLocation: false,
  visible: true,
};
