Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMDMzYWFiYy03NmQ2LTQ1Y2ItOTIxMC00YTlhNWJiOTczYTEiLCJpZCI6MjI5OTIwLCJpYXQiOjE3MzUxNDI5ODN9.5JsxkFNj9aTyDXASAq5If6K6oQmBRtw4-xzKA0-ksec';

const container = document.getElementById('urbanViewer');
const viewerMessage = document.getElementById('urbanViewerMessage');

if (!container || !window.Cesium) {
    showViewerMessage('Urban viewer unavailable.');
} else {
    initUrbanViewer().catch((error) => {
        console.error('Urban viewer error:', error);
        showViewerMessage('Unable to load the urban viewer.');
    });
}

function showViewerMessage(message) {
    if (!viewerMessage) return;

    viewerMessage.textContent = message;
    viewerMessage.classList.add('is-visible');
}

async function initUrbanViewer() {
    const viewer = new Cesium.Viewer('urbanViewer', {
        timeline: false,
        animation: false,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        fullscreenButton: false,
        infoBox: false,
        selectionIndicator: false,
        globe: false,
        requestRenderMode: true,
        maximumRenderTimeChange: Infinity,
        msaaSamples: 4
    });

    viewer.resolutionScale = 1;
    viewer.scene.fog.enabled = false;
    viewer.scene.postProcessStages.fxaa.enabled = true;
    viewer.scene.requestRenderMode = true;
    viewer.scene.skyBox.show = false;
    viewer.scene.sun.show = false;
    viewer.scene.moon.show = false;
    viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#d9d3c8');
    viewer.clock.currentTime = Cesium.JulianDate.fromDate(new Date('2025-06-21T12:00:00Z'));

    const googleTileset = await Cesium.createGooglePhotorealistic3DTileset();
    googleTileset.maximumScreenSpaceError = 6;
    viewer.scene.primitives.add(googleTileset);

    const controller = viewer.scene.screenSpaceCameraController;
    const canvas = viewer.scene.canvas;
    canvas.style.touchAction = 'none';

    const lotPositions = Cesium.Cartesian3.fromDegreesArrayHeights([
        7.678320275255368, 45.06819921851688, 307.86953979179225,
        7.678175664277602, 45.06825063035882, 309.9027716883579,
        7.6782216000649886, 45.068324895597, 310.29434068610476,
        7.678083938469373, 45.06837653398736, 310.3837244492746,
        7.678003575403017, 45.06824469287679, 310.3081221217889,
        7.677864396426539, 45.06828974986691, 310.40809567543863,
        7.677958410745485, 45.068429671255025, 310.27416409790806,
        7.677926765555606, 45.068448090324274, 307.78377539209237,
        7.678007446724227, 45.06855564543883, 306.943930236948,
        7.678458997044977, 45.06838350680859, 307.4626756615647
    ]);

    const selectedPolygon = viewer.entities.add({
        id: 'selectedPolygon',
        name: 'Alfieri',
        polygon: {
            hierarchy: lotPositions,
            material: new Cesium.ColorMaterialProperty(
                Cesium.Color.fromCssColorString('#d6a14d').withAlpha(0.15)
            ),
            perPositionHeight: true,
            extrudedHeight: 285,
            outline: false
        }
    });

    const hierarchy = selectedPolygon.polygon.hierarchy.getValue(Cesium.JulianDate.now());
    const boundingSphere = Cesium.BoundingSphere.fromPoints(hierarchy.positions);
    const orbitTarget = boundingSphere.center;
    const orbitCartographic = Cesium.Cartographic.fromCartesian(orbitTarget);
    const lotLongitude = orbitCartographic.longitude;
    const lotLatitude = orbitCartographic.latitude;

    const baseHeight = 285;
    const markerHeight = 330;

    const markerBasePosition = Cesium.Cartesian3.fromRadians(lotLongitude, lotLatitude, baseHeight);
    const markerPosition = Cesium.Cartesian3.fromRadians(lotLongitude, lotLatitude, markerHeight);

    const diamondSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
        <defs>
          <filter id="g" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b"/>
            <feMerge>
              <feMergeNode in="b"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#g)">
          <polygon
            points="48,10 68,44 48,78 28,44"
            fill="#d6a14d"
            fill-opacity="0.95"
            stroke="rgba(255,255,255,0.95)"
            stroke-width="3"
            stroke-linejoin="round"
          />
          <polygon
            points="48,22 60,44 48,66 36,44"
            fill="#d6a14d"
          />
        </g>
      </svg>
    `;

    viewer.entities.add({
        id: 'lotMarkerBaseGlow',
        position: markerBasePosition,
        ellipse: {
            semiMajorAxis: 7,
            semiMinorAxis: 7,
            height: baseHeight + 0.05,
            material: Cesium.Color.fromCssColorString('#d6a14d').withAlpha(0.14),
            outline: false
        }
    });

    viewer.entities.add({
        id: 'lotMarkerBaseRing',
        position: markerBasePosition,
        ellipse: {
            semiMajorAxis: 10,
            semiMinorAxis: 10,
            height: baseHeight + 0.1,
            material: Cesium.Color.WHITE.withAlpha(0.01),
            outline: true,
            outlineColor: Cesium.Color.fromCssColorString('#d6a14d').withAlpha(0.42),
            outlineWidth: 1
        }
    });

    viewer.entities.add({
        id: 'lotDiamondMarker',
        position: markerPosition,
        billboard: {
            image: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(diamondSvg)}`,
            scale: 0.58,
            verticalOrigin: Cesium.VerticalOrigin.CENTER,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
        }
    });

    let orbitHeading = Cesium.Math.toRadians(365);
    let orbitPitch = Cesium.Math.toRadians(-35);
    let orbitRange = 175;

    const minPitch = Cesium.Math.toRadians(-80);
    const maxPitch = Cesium.Math.toRadians(-10);
    const minRange = 50;
    const maxRange = 900;

    controller.enableInputs = false;
    controller.enableTranslate = false;
    controller.enableZoom = false;
    controller.enableTilt = false;
    controller.enableRotate = false;
    controller.enableLook = false;

    function updateOrbitCamera() {
        viewer.camera.lookAt(
            orbitTarget,
            new Cesium.HeadingPitchRange(orbitHeading, orbitPitch, orbitRange)
        );
    }

    function focusSelectedPolygon(duration = 2.2) {
        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

        viewer.camera.flyToBoundingSphere(boundingSphere, {
            duration,
            offset: new Cesium.HeadingPitchRange(orbitHeading, orbitPitch, orbitRange),
            complete: () => {
                updateOrbitCamera();
            },
            cancel: () => {
                updateOrbitCamera();
            }
        });
    }

    focusSelectedPolygon(0);

    let isPointerDown = false;
    let startX = 0;
    let startY = 0;
    const activePointers = new Map();
    let isPinching = false;
    let lastPinchDistance = 0;

    function getPointerDistance() {
        if (activePointers.size < 2) return 0;

        const points = Array.from(activePointers.values());
        const dx = points[0].x - points[1].x;
        const dy = points[0].y - points[1].y;

        return Math.hypot(dx, dy);
    }

    function beginOrbitDrag(x, y) {
        isPointerDown = true;
        startX = x;
        startY = y;
    }

    function syncSinglePointerAfterGesture() {
        if (activePointers.size === 1 && !isPinching) {
            const remainingPointer = Array.from(activePointers.values())[0];
            beginOrbitDrag(remainingPointer.x, remainingPointer.y);
            return;
        }

        isPointerDown = false;
    }

    canvas.addEventListener('pointerdown', (event) => {
        const isPrimaryMouseButton = event.pointerType !== 'touch' ? event.button === 0 : true;
        if (!isPrimaryMouseButton) return;

        activePointers.set(event.pointerId, {
            x: event.clientX,
            y: event.clientY
        });

        if (activePointers.size === 2) {
            isPinching = true;
            isPointerDown = false;
            lastPinchDistance = getPointerDistance();
        } else if (activePointers.size === 1) {
            beginOrbitDrag(event.clientX, event.clientY);
        }

        canvas.setPointerCapture(event.pointerId);
        event.preventDefault();
    });

    canvas.addEventListener('pointermove', (event) => {
        if (activePointers.has(event.pointerId)) {
            activePointers.set(event.pointerId, {
                x: event.clientX,
                y: event.clientY
            });
        }

        if (isPinching && activePointers.size >= 2) {
            const currentDistance = getPointerDistance();
            const pinchDelta = currentDistance - lastPinchDistance;

            if (Math.abs(pinchDelta) > 2) {
                orbitRange -= pinchDelta * 1.5;
                orbitRange = Cesium.Math.clamp(orbitRange, minRange, maxRange);
                updateOrbitCamera();
                lastPinchDistance = currentDistance;
            }

            event.preventDefault();
            return;
        }

        if (!isPointerDown || activePointers.size !== 1) return;

        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        startX = event.clientX;
        startY = event.clientY;

        orbitHeading += deltaX * 0.003;
        orbitPitch -= deltaY * 0.003;
        orbitPitch = Cesium.Math.clamp(orbitPitch, minPitch, maxPitch);

        updateOrbitCamera();
        event.preventDefault();
    });

    canvas.addEventListener('pointerup', (event) => {
        activePointers.delete(event.pointerId);

        if (activePointers.size < 2) {
            isPinching = false;
            lastPinchDistance = 0;
        }

        syncSinglePointerAfterGesture();
        event.preventDefault();
    });

    canvas.addEventListener('pointercancel', (event) => {
        activePointers.delete(event.pointerId);

        if (activePointers.size < 2) {
            isPinching = false;
            lastPinchDistance = 0;
        }

        syncSinglePointerAfterGesture();
    });

    canvas.addEventListener('lostpointercapture', (event) => {
        activePointers.delete(event.pointerId);

        if (activePointers.size < 2) {
            isPinching = false;
            lastPinchDistance = 0;
        }

        syncSinglePointerAfterGesture();
    });

    canvas.addEventListener(
        'wheel',
        (event) => {
            event.preventDefault();

            orbitRange += event.deltaY > 0 ? 25 : -25;
            orbitRange = Cesium.Math.clamp(orbitRange, minRange, maxRange);
            updateOrbitCamera();
        },
        { passive: false }
    );
}
