import React, { useContext } from "react";
import ReactDOM from "../../node_modules/react-dom";
import TweetContext from "../Tweets/TweetContext";
import LocModal from "../components/Modal/LocationModal";
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
      gotCurLoc: false,
      locModalShow: false,
      locName: null,
      zoom: this.props.zoom,
    };
    this.markers = [];
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.zoom != this.props.zoom) {
      let mp = document.getElementById("mapback");
      mp.classList.remove("map_canvas");
      mp.classList.add("map_canvas_blur");
      this.setState({
        locModalShow: true,
        locName: this.props.zoom,
      });
      this.loadMap();
    }

    if (prevProps.google != this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
      var { google } = this.props;
      var mev = {
        stop: null,
        latLng: new google.maps.LatLng(
          this.state.currentLocation.lat,
          this.state.currentLocation.lng
        ),
      };
      google.maps.event.trigger(this.map, "click", mev);
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
              gotCurLoc: true,
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
      // if (this.state.gotCurLoc) {
      //   localStorage.setItem("location", "Loading Tweets..");
      //   context.setTweets([]);
      //   var latlng = [lat, lng];
      //   fetch("https://world-feed-backend.herokuapp.com/get_tweet", {
      //     method: "post",
      //     headers: { "Content-type": "application/json" },

      //     body: JSON.stringify({
      //       type: this.props.zoom === 7 ? "city" : "country",
      //       lat: latlng[0],
      //       lng: latlng[1],
      //     }),
      //   })
      //     .then((response) => response.json())
      //     .then((data) => {
      //       console.log(data);
      //       context.setTweets([]);
      //       setTimeout(() => context.setTweets(data), 500);

      //       //context.setTweets(data);
      //     });
      // }

      // this.reverseAddress(latlng, maps);
      // this.placeMarkerAndPanTo(latlng, this.map, maps);
      this.map.addListener("click", (event) => {
        // alert("clicked" + event.latLng);
        console.log(event);
        localStorage.setItem("location", "Loading Tweets..");
        context.setTweets([]);
        var latlng = event.latLng.toString().replace(/\(|\)/g, "").split(", ");
        fetch("https://world-feed-backend.herokuapp.com/get_tweet", {
          method: "post",
          headers: { "Content-type": "application/json" },

          body: JSON.stringify({
            type: this.props.zoom === 7 ? "city" : "country",
            lat: latlng[0],
            lng: latlng[1],
          }),
        })
          .then((response) => {
            if (!response.ok) {
              alert(
                "Hi! This app runs on a basic Twitter api subscription with strict rate limits. We are likely rate limited right now, since you are seeing this :(. Please check back in 15 minutes!"
              );
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            context.setTweets([]);
            setTimeout(() => context.setTweets(data), 500);

            //context.setTweets(data);
          });

        this.reverseAddress(event.latLng, maps);
        this.placeMarkerAndPanTo(event.latLng, this.map, maps);
      });
    }
  }

  reverseAddress(latLng, maps) {
    var geocoder = new maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      // alert(status);
      if (status === "OK") {
        // let mp = document.getElementById("mapback");
        // mp.classList.remove("map_canvas");
        // mp.classList.add("map_canvas_blur");
        console.log("hi", results);
        var place = "";
        try {
          place =
            this.props.zoom === 7
              ? results[results.length - 2].address_components[0].long_name
              : results[results.length - 2].address_components[1].long_name;
        } catch (err) {
          try {
            place = results[0].address_components[0].long_name;
          } catch (err2) {
            place = "Invalid Location";
          }
        }

        localStorage.setItem("location", place);
        // this.setState({
        //   locModalShow: true,
        //   locName: place,
        // });
        //alert(results[results.length - 2].address_components[0].long_name);
        // console.log(results);
      }
    });
  }

  getPlaceInfo(map, maps) {
    const service = new maps.places.PlacesService(map);
  }

  placeMarkerAndPanTo(latLng, map, maps) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    var marker = new maps.Marker({
      position: latLng,
      map: map,
    });
    this.markers.push(marker);
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
    let locModalClose = () => {
      let mp = document.getElementById("mapback");
      mp.classList.remove("map_canvas_blur");
      mp.classList.add("map_canvas");

      // let mp = document.getElementById("mapback");
      // mp.classList.remove("mapBlur");
      this.setState({
        locModalShow: false,
      });
    };
    const style = Object.assign({}, mapStyles.map);
    return (
      <div>
        {/* <TweetContext.Consumer></TweetContext.Consumer> */}

        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
        <LocModal
          locName={this.state.locName}
          show={this.state.locModalShow}
          onHide={locModalClose}
        />
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
