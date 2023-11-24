export function detectDeviceType() {
  var userAgent = navigator.userAgent;
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    )
  ) {
    return "Mobile";
  } else if (/Tablet|iPad/i.test(userAgent)) {
    return "Tablet";
  } else if (/Windows|Mac|Linux/i.test(userAgent)) {
    return "Laptop";
  } else {
    return "Unknown";
  }
}

export function getIPAddress() {
  return new Promise<string | null>((resolve, reject) => {
    // Using 'as' to assert the existence of mozRTCPeerConnection
    var RTCPeerConnection =
      window.RTCPeerConnection ||
      (window as any).mozRTCPeerConnection ||
      (window as any).webkitRTCPeerConnection;

    if (!RTCPeerConnection) {
      reject("Trình duyệt không hỗ trợ WebRTC");
      return;
    }

    var rtc = new RTCPeerConnection({ iceServers: [] });
    rtc.createDataChannel("");

    rtc
      .createOffer()
      .then((offer) => rtc.setLocalDescription(offer))
      .catch((error) => {
        reject("Lỗi khi tạo offer: " + error);
      });

    rtc.onicecandidate = function (event) {
      if (event.candidate) {
        var ipRegex =
          /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
        var match = ipRegex.exec(event.candidate.candidate);
        var ipAddress = match ? match[1] : null;
        rtc.onicecandidate = null;
        resolve(ipAddress);
      }
    };
  });
}
