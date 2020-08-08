import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

export class MapContainer extends Component {
  state = {
    selectedLoc: {},
    currentMarker: {},
    info: false,
  };

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
      <Map
        google={this.props.google}
        style={mapStyles}
        zoom={15}
        initialCenter={{
          lat: 32.78,
          lng: -96.8,
        }}
        minZoom={5}
        maxZoom={10}
        // gestureHandling={"none"}
        zoomControl={false}
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
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDwvNf66Sbjxr8Iou7Z2kEqyNbEFkNTCqU",
})(MapContainer);
