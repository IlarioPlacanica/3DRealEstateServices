var APP_DATA = {
  "scenes": [
    {
      "id": "0-ingresso",
      "name": "Ingresso",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -0.13864224475449838,
          "pitch": 0.08328047508500269,
          "rotation": 0,
          "target": "1-cucina"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-cucina",
      "name": "Cucina",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.0849258835287916,
          "pitch": 0.09950351853254347,
          "rotation": 0,
          "target": "2-soggiorno"
        },
        {
          "yaw": -1.6332715724911342,
          "pitch": 0.0935852931731489,
          "rotation": 0,
          "target": "3-bagno"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-soggiorno",
      "name": "Soggiorno",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.05244541821162407,
          "pitch": 0.09427702634126689,
          "rotation": 0,
          "target": "1-cucina"
        },
        {
          "yaw": -0.1841950767076721,
          "pitch": 0.07133417511565199,
          "rotation": 0,
          "target": "0-ingresso"
        },
        {
          "yaw": 2.115717516536834,
          "pitch": 0.07755434979896769,
          "rotation": 0,
          "target": "4-camera-da-letto"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-bagno",
      "name": "Bagno",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 2.9996450630712115,
          "pitch": 0.11831283425433092,
          "rotation": 0,
          "target": "1-cucina"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "4-camera-da-letto",
      "name": "Camera da letto",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.21421040206976016,
          "pitch": 0.12350360470775001,
          "rotation": 0,
          "target": "2-soggiorno"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "A14",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": false,
    "viewControlButtons": false
  }
};
