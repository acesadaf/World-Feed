import React, { Component } from "react";
import {
  Map,
  GoogleApiWrapper,
  InfoWindow,
  Marker,
} from "../../node_modules/google-maps-react";
import CurrentLocation from "./Location";
const mapStyles = {
  width: "100%",
  height: "100%",
};

const API_KEY = process.env.REACT_APP_API_KEY;

export class MapContainer extends Component {
  state = {
    selectedLoc: {},
    currentMarker: {},
    info: false,
  };

  API_KEY = this.props.apiKey;

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedLoc: props,
      currentMarker: marker,
      info: true,
    });

  onClose = (props) => {
    if (this.state.info) {
      this.setState({
        info: false,
        currentMarker: null,
      });
    }
  };

  render() {
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
        // gestureHandling={"none"}
      >
        {/* <Marker onClick={this.onMarkerClick} name={"Dallas"} /> */}
        <Marker onClick={this.onMarkerClick} name={"Richardson"} />
        <InfoWindow
          marker={this.state.currentMarker}
          visible={this.state.info}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedLoc.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY,
})(MapContainer);
