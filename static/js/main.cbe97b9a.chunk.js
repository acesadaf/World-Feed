(this["webpackJsonpmap-project"]=this["webpackJsonpmap-project"]||[]).push([[0],{102:function(e,t,a){},106:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(7),s=a.n(r),l=(a(61),a(40)),i=(a(62),a(63),a(17)),c=a(18),p=a(21),m=a(20),u=a(32),d=o.a.createContext({tweets:[],setTweets:function(){}}),g=a(109),h=a(113),y=(a(64),a(65),function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(e){return Object(i.a)(this,a),t.call(this,e)}return Object(c.a)(a,[{key:"render",value:function(){return o.a.createElement(g.a,Object.assign({},this.props,{dark:!0,"aria-labelledby":"contained-modal-title-vcenter",centered:!0,backdrop:!1,dialogClassName:"dialog"}),o.a.createElement(g.a.Header,{closeButton:!0},o.a.createElement(g.a.Title,{id:"contained-modal-title-vcenter"},"Switching Maps!")),o.a.createElement(g.a.Body,null,"Switching to"," ",4===this.props.locName?"Country view":"State view"),o.a.createElement(g.a.Footer,null,o.a.createElement(h.a,{onClick:this.props.onHide},"Close")))}}]),a}(n.Component)),f={position:"absolute",width:"100%",height:"100%"},v=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(e){var n;Object(i.a)(this,a);var o=(n=t.call(this,e)).props.initCenter,r=o.lat,s=o.lng;return n.state={currentLocation:{lat:r,lng:s},gotCurLoc:!1,locModalShow:!1,locName:null,zoom:n.props.zoom},n.markers=[],n}return Object(c.a)(a,[{key:"componentDidUpdate",value:function(e,t){var a=this;if(e.zoom!=this.props.zoom){var n=document.getElementById("mapback");n.classList.remove("map_canvas"),n.classList.add("map_canvas_blur");var o=this.map.getCenter();console.log(o),this.setState({locModalShow:!0,locName:this.props.zoom,currentLocation:{lat:o.lat(),lng:o.lng()}},(function(){return a.loadMap()}))}if(e.google!=this.props.google&&this.loadMap(),t.currentLocation!==this.state.currentLocation){this.recenterMap();var r=this.props.google,s={stop:null,latLng:new r.maps.LatLng(this.state.currentLocation.lat,this.state.currentLocation.lng)};r.maps.event.trigger(this.map,"click",s)}}},{key:"componentDidMount",value:function(){var e=this;this.props.centerAroundCurrentLocation&&navigator&&navigator.geolocation&&navigator.geolocation.getCurrentPosition((function(t){var a=t.coords;e.setState({currentLocation:{lat:a.latitude,lng:a.longitude,gotCurLoc:!0}})})),this.loadMap()}},{key:"loadMap",value:function(){var e=this;if(this.props&&this.props.google){var t=this.props.google.maps,a=this.refs.map,n=s.a.findDOMNode(a),o=this.props.zoom,r=this.props,l=r.minZoom,i=r.maxZoom,c=this.state.currentLocation,p=c.lat,m=c.lng,u=new t.LatLng(p,m),d=Object.assign({},{center:u,zoom:o,minZoom:l,maxZoom:i,styles:[{elementType:"geometry",stylers:[{color:"#242f3e"}]},{elementType:"labels.text.stroke",stylers:[{color:"#242f3e"}]},{elementType:"labels.text.fill",stylers:[{color:"#746855"}]},{featureType:"administrative.locality",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#263c3f"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#6b9a76"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#38414e"}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{color:"#212a37"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#9ca5b3"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#746855"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#1f2835"}]},{featureType:"road.highway",elementType:"labels.text.fill",stylers:[{color:"#f3d19c"}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#2f3948"}]},{featureType:"transit.station",elementType:"labels.text.fill",stylers:[{color:"#d59563"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#17263c"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#515c6d"}]},{featureType:"water",elementType:"labels.text.stroke",stylers:[{color:"#17263c"}]}]});this.map=new t.Map(n,d);var g=this.context;this.map.addListener("click",(function(a){console.log(a),localStorage.setItem("location","Loading Tweets.."),g.setTweets([]);var n=a.latLng.toString().replace(/\(|\)/g,"").split(", ");fetch("https://world-feed-backend.herokuapp.com/get_tweet",{method:"post",headers:{"Content-type":"application/json"},body:JSON.stringify({type:7===e.props.zoom?"city":"country",lat:n[0],lng:n[1]})}).then((function(e){return e.ok||alert("Hi! This app runs on a basic Twitter api subscription with strict rate limits. We are likely rate limited right now, since you are seeing this :(. Please check back in 15 minutes!"),e.json()})).then((function(e){console.log(e),g.setTweets([]),setTimeout((function(){return g.setTweets(e)}),500)})),e.reverseAddress(a.latLng,t),e.placeMarkerAndPanTo(a.latLng,e.map,t)}))}}},{key:"reverseAddress",value:function(e,t){var a=this;(new t.Geocoder).geocode({location:e},(function(e,t){if("OK"===t){console.log("hi",e);var n="";try{n=7===a.props.zoom?e[e.length-2].address_components[0].long_name:e[e.length-2].address_components[1].long_name}catch(o){try{n=e[0].address_components[0].long_name}catch(r){n="Invalid Location"}}localStorage.setItem("location",n)}}))}},{key:"getPlaceInfo",value:function(e,t){new t.places.PlacesService(e)}},{key:"placeMarkerAndPanTo",value:function(e,t,a){for(var n=0;n<this.markers.length;n++)this.markers[n].setMap(null);var o=new a.Marker({position:e,map:t});this.markers.push(o),t.panTo(e)}},{key:"renderChildren",value:function(){var e=this,t=this.props.children;if(t)return o.a.Children.map(t,(function(t){if(t)return o.a.cloneElement(t,{map:e.map,google:e.props.google,mapCenter:e.state.currentLocation})}))}},{key:"recenterMap",value:function(){var e=this.map,t=this.state.currentLocation,a=this.props.google.maps;if(e){var n=new a.LatLng(t.lat,t.lng);e.panTo(n)}}},{key:"render",value:function(){var e=this,t=Object.assign({},f);return o.a.createElement("div",null,o.a.createElement("div",{style:t,ref:"map"},"Loading map..."),this.renderChildren(),o.a.createElement(y,{locName:this.state.locName,show:this.state.locModalShow,onHide:function(){var t=document.getElementById("mapback");t.classList.remove("map_canvas_blur"),t.classList.add("map_canvas"),e.setState({locModalShow:!1})}}))}}]),a}(o.a.Component);v.contextType=d;var b=v;v.defaultProps={zoom:7,initCenter:{lat:32.78,lng:-96.8},minZoom:5,maxZoom:8,centerAroundCurrentLocation:!1,visible:!0};var k=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).state={selectedLoc:{},currentMarker:{},info:!1},e.API_KEY=e.props.apiKey,e.onMarkerClick=function(t,a,n){return e.setState({selectedLoc:t,currentMarker:a,info:!0})},e.onClose=function(t){e.state.info&&e.setState({info:!1,currentMarker:null})},e}return Object(c.a)(a,[{key:"render",value:function(){return o.a.createElement(b,{centerAroundCurrentLocation:!0,google:this.props.google,zoom:this.props.zoom,minZoom:this.props.minZoom,maxZoom:this.props.maxZoom},o.a.createElement(u.Marker,{onClick:this.onMarkerClick,name:"You are here!"}),o.a.createElement(u.InfoWindow,{marker:this.state.currentMarker,visible:this.state.info,onClose:this.onClose},o.a.createElement("div",null,o.a.createElement("h4",null,this.state.selectedLoc.name))))}}]),a}(n.Component),w=Object(u.GoogleApiWrapper)({apiKey:"AIzaSyB7E6SqNJiKjaLUqNuga9Ci-zmTqwIftV0"})(k),T=a(110),E=function(e){var t=e.isCountryMap,n=e.swapMap,r=a(85);return o.a.createElement(T.a,{fixed:"top",style:{background:"#222831"}},o.a.createElement("img",{alt:"Logo not found",src:r,width:"30",className:"d-inline-block align-top",style:{paddingRight:"10px"}}),o.a.createElement(T.a.Brand,{href:"#home",style:{color:"#ebebeb",borderColor:"#292929",fontSize:"25px"}},"World Feed"),o.a.createElement(T.a.Collapse,{className:"justify-content-end"},o.a.createElement(T.a.Text,{style:{padding:"15px",color:"white"}},"Map Level: ",o.a.createElement("strong",null,t?"Country":"State"," ")),o.a.createElement(h.a,{variant:"secondary",onClick:n},"Switch Map Level")))},x=a(111),C=(a(86),a(49)),L=function(e){return o.a.createElement(x.a,{text:"dark",style:{borderRadius:"40px",background:"#f2a365"}},o.a.createElement(x.a.Body,null,o.a.createElement(x.a.Title,null,e.username," tweeted: "),o.a.createElement(x.a.Text,null,e.tweet),o.a.createElement(h.a,{style:{borderRadius:"50px",justifyContent:"center",boxShadow:"1px 1px 1px 1px #000000"},variant:"secondary",active:!0,onClick:function(){return window.open(e.url,"_blank")}},"See Tweet")))},j=a(50),S=a(112),M=a(108),O=a(38),z=a.n(O);a(102);function N(){var e=Object(C.a)(["\n  display: grid;\n  // grid-template-columns: repeat(auto-fill, 220px);\n  paddingleft: 20px;\n  grid-gap: 20px;\n  align-self: center;\n  padding-right: 10px;\n  .transition-enter {\n    opacity: 0.01;\n    transform: translate(0, -10px);\n  }\n  .transition-enter-active {\n    opacity: 1;\n    transform: translate(0, 0);\n    transition: all 400ms ease-in;\n  }\n  .transition-exit {\n    opacity: 1;\n    transform: translate(0, 0);\n  }\n  .transition-exit-active {\n    opacity: 0.01;\n    transform: translate(0, 10px);\n    transition: all 400ms ease-in;\n  }\n"]);return N=function(){return e},e}var I=j.a.div(N()),_=function(){var e=Object(n.useContext)(d),t=e.tweets;e.setTweets;return o.a.createElement(S.a,{component:I},o.a.createElement("div",{class:"hyphens",style:{wordBreak:"break-word"}},o.a.createElement("h1",{class:"logo",style:{paddingTop:"35px"}},o.a.createElement(z.a,{text:localStorage.getItem("location"),springConfig:O.presets.wobbly}))),t.map((function(e){return o.a.createElement(M.a,{timeout:400,in:!0,classNames:"transition"},L(e))})))};a(105);var Z=function(){var e=Object(n.useState)([]),t=Object(l.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)(!1),i=Object(l.a)(s,2),c=i[0],p=i[1];null===localStorage.getItem("location")&&localStorage.setItem("location","pick a place!");var m={tweets:a,setTweets:r};return o.a.createElement("div",{class:"main"},o.a.createElement("link",{rel:"stylesheet",href:"https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",integrity:"sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z",crossorigin:"anonymous"}),o.a.createElement("script",{src:"https://code.jquery.com/jquery-3.5.1.slim.min.js",integrity:"sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj",crossorigin:"anonymous"}),o.a.createElement("script",{src:"https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js",integrity:"sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN",crossorigin:"anonymous"}),o.a.createElement("script",{src:"https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js",integrity:"sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV",crossorigin:"anonymous"}),o.a.createElement(d.Provider,{value:m},o.a.createElement(E,{isCountryMap:c,swapMap:function(){p(!c)}}),o.a.createElement("div",{style:{paddingTop:"60px"},class:"flexbox-container"},o.a.createElement("div",{class:"left_container"},o.a.createElement(_,null)),o.a.createElement("div",{id:"mapback",class:"map_canvas"},o.a.createElement(w,{zoom:c?4:7,minZoom:c?3:5,maxZoom:c?5:8})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(Z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},56:function(e,t,a){e.exports=a(106)},61:function(e,t,a){},62:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},63:function(e,t,a){},64:function(e,t,a){},65:function(e,t,a){},85:function(e,t,a){e.exports=a.p+"static/media/cartoon-globe.e4b1dac8.png"},86:function(e,t,a){}},[[56,1,2]]]);
//# sourceMappingURL=main.cbe97b9a.chunk.js.map