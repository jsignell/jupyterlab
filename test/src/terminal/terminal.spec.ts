// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import expect = require('expect.js');

import {
  TerminalSession
} from '@jupyterlab/services';

import {
  Message
} from 'phosphor/lib/core/messaging';

import {
  ResizeMessage, WidgetMessage, Widget
} from 'phosphor/lib/ui/widget';

import {
  TerminalWidget
} from '../../../lib/terminal';


class LogTerminal extends TerminalWidget {

  methods: string[] = [];

  protected onAfterAttach(msg: Message): void {
    super.onAfterAttach(msg);
    this.methods.push('onAfterAttach');
  }

  protected onAfterShow(msg: Message): void {
    super.onAfterShow(msg);
    this.methods.push('onAfterShow');
  }

  protected onCloseRequest(msg: Message): void {
    super.onCloseRequest(msg);
    this.methods.push('onCloseRequest');
  }

  protected onResize(msg: ResizeMessage): void {
    super.onResize(msg);
    this.methods.push('onResize');
  }

  protected onUpdateRequest(msg: Message): void {
    super.onUpdateRequest(msg);
    this.methods.push('onUpdateRequest');
  }

  protected onFitRequest(msg: Message): void {
    super.onFitRequest(msg);
    this.methods.push('onFitRequest');
  }

  protected onActivateRequest(msg: Message): void {
    super.onActivateRequest(msg);
    this.methods.push('onActivateRequest');
  }

}


describe('terminal/index', () => {

  describe('TerminalWidget', () => {

    let widget: LogTerminal;

    beforeEach(() => {
      widget = new LogTerminal();
    });

    afterEach(() => {
      widget.dispose();
    });

    describe('#constructor()', () => {

      it('should create a terminal widget', () => {
        expect(widget).to.be.a(TerminalWidget);
      });

    });

    describe('#session', () => {

      it('should get be `null` by default', () => {
        expect(widget.session).to.be(null);
      });

      it('should set the title when ready', (done) => {
        let session: TerminalSession.ISession;
        TerminalSession.startNew().then(s => {
          session = s;
          widget.session = session;
          expect(widget.session).to.be(session);
          return session.ready;
        }).then(() => {
          expect(widget.title.label).to.contain(session.name);
        }).then(done, done);
      });

    });

    describe('#fontSize', () => {

      it('should be 14 by default', () => {
        expect(widget.fontSize).to.be(14);
      });

      it('should be settable', () => {
        widget.fontSize = 13;
        expect(widget.fontSize).to.be(13);
      });

    });

    describe('#background', () => {

      it('should be black by default', () => {
        expect(widget.background).to.be('black');
      });

      it('should be settable', () => {
        widget.background = 'white';
        expect(widget.background).to.be('white');
      });

    });

    describe('#color', () => {

      it('should be white by default', () => {
        expect(widget.color).to.be('white');
      });

      it('should be settable', () => {
        widget.color = 'black';
        expect(widget.color).to.be('black');
      });

    });

    describe('#dispose()', () => {

      it('should dispose of the resources used by the widget', () => {
        expect(widget.isDisposed).to.be(false);
        widget.dispose();
        expect(widget.isDisposed).to.be(true);
        widget.dispose();
        expect(widget.isDisposed).to.be(true);
      });

    });

    describe('#processMessage()', () => {

      it('should handle fit requests', () => {
        widget.processMessage(WidgetMessage.FitRequest);
        expect(widget.methods).to.contain('onFitRequest');
      });

    });

    describe('#onAfterAttach()', () => {

      it('should resize the terminal', () => {
        Widget.attach(widget, document.body);
      });

    });

    describe('#onAfterShow()', () => {

      it('should resize the terminal', () => {
        widget.hide();
        Widget.attach(widget, document.body);
        widget.show();
      });

    });

    describe('#onCloseRequest', () => {

      it('should dispose of the terminal after closing', () => {

      });

    });

    describe('#onResize()', () => {

      it('should resize the terminal', () => {

      });

    });

    describe('#onUpdateRequest()', () => {

      it('should set the style of the terminal', () => {

      });

    });

    describe('#onFitRequest', () => {

      it('should send a resize request', () => {

      });

    });

    describe('#onActivateRequest', () => {

      it('should focus the terminal element', () => {

      });

    });

  });

});
