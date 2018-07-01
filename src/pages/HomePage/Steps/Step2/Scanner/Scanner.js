import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Quagga from 'quagga';

export default class Scanner extends PureComponent {
  static propTypes = {
    onDetected: PropTypes.func.isRequired,
  }

  static onProcessed(result) {
    const drawingCtx = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;

    if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(
          0,
          0,
          parseInt(drawingCanvas.getAttribute('width'), 10),
          parseInt(drawingCanvas.getAttribute('height'), 10),
        );
        result.boxes
          .filter(box => box !== result.box)
          .forEach(box => Quagga.ImageDebug.drawPath(
            box,
            { x: 0, y: 1 },
            drawingCtx,
            { color: '#76FF03', lineWidth: 2 },
          ));
      }

      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: '#3f51b5', lineWidth: 2 });
      }

      if (result.codeResult && result.codeResult.code) {
        Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: '#f50057', lineWidth: 3 });
      }
    }
  }

  componentDidMount() {
    this.onInit();

    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.interactiveNode.classList.toggle('vertical', window.innerWidth < window.innerHeight);
        this.componentWillUnmount();
        this.onInit();
      });
    });
  }

  componentWillUnmount() {
    Quagga.stop();
    Quagga.offDetected(this.props.onDetected);
    Quagga.offProcessed(Scanner.onProcessed);
  }

  onInit = () => {
    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        constraints: {
          width: window.innerWidth,
          height: window.innerHeight,
          facingMode: 'environment', // or user
        },
        area: { // defines rectangle of the detection/localization area
          top: window.innerWidth < window.innerHeight ? '45%' : '30%',
          right: window.innerWidth < window.innerHeight ? '10%' : '20%',
          left: window.innerWidth < window.innerHeight ? '10%' : '20%',
          bottom: window.innerWidth < window.innerHeight ? '35%' : '20%',
        },
      },
      locator: {
        patchSize: 'medium',
        halfSample: true,
      },
      numOfWorkers: navigator.hardwareConcurrency,
      decoder: {
        readers: ['i2of5_reader'],
      },
      locate: true,
      frequency: 10,
    }, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Initialization finished. Ready to start');
        Quagga.start();
        Quagga.onDetected(this.props.onDetected);
        Quagga.onProcessed(Scanner.onProcessed);
      }
    });

    this.interactiveNode.classList.toggle('vertical', window.innerWidth < window.innerHeight);
  }

  handleRef = (node) => {
    this.interactiveNode = node;
  }

  render() {
    return (
      <div ref={this.handleRef} id="interactive" className="viewport" />
    );
  }
}
