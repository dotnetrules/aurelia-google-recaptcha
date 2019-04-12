define(["exports", "amaranth-utils", "aurelia-event-aggregator", "aurelia-framework", "nanoid", "./config"], function (_exports, _amaranthUtils, _aureliaEventAggregator, _aureliaFramework, _nanoid, _config) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.RecaptchaBase = _exports.GR = _exports.getHash = void 0;
  _nanoid = _interopRequireDefault(_nanoid);

  var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

  var getHash = function getHash() {
    return (0, _nanoid.default)().replace(/-/gi, '');
  };

  _exports.getHash = getHash;
  var GR = 'grecaptcha';
  _exports.GR = GR;
  var RecaptchaBase = (_dec = (0, _aureliaFramework.noView)(), _dec2 = (0, _aureliaFramework.inject)(Element, _config.Config, _aureliaEventAggregator.EventAggregator), _dec3 = (0, _aureliaFramework.bindable)({
    defaultBindingMode: _aureliaFramework.bindingMode.twoWay
  }), _dec4 = (0, _aureliaFramework.bindable)({
    defaultBindingMode: _aureliaFramework.bindingMode.twoWay
  }), _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = function () {
    function RecaptchaBase(element, config, events) {
      _initializerDefineProperty(this, "auto", _descriptor, this);

      _initializerDefineProperty(this, "id", _descriptor2, this);

      _initializerDefineProperty(this, "sitekey", _descriptor3, this);

      _initializerDefineProperty(this, "value", _descriptor4, this);

      this.config = void 0;
      this.eventName = null;
      this.lastCheck = null;
      this.__auevents__ = {};
      this.__watchers__ = {};
      this.element = element;
      this.config = config;
      this.events = events;
      this.logger = _aureliaFramework.LogManager.getLogger((0, _amaranthUtils.className)(this));
    }

    var _proto = RecaptchaBase.prototype;

    _proto.bind = function bind() {
      if (!this.id) {
        this.id = getHash();
      }

      if (!this.sitekey) {
        this.sitekey = this.config.get('siteKey');
      }
    };

    _proto.detached = function detached() {
      this.unregisterEvents();
      this.unregisterWatchers();
    };

    _proto.getScriptId = function getScriptId() {
      return "recaptcha_" + RecaptchaBase.HASH + "_" + this.sitekey;
    };

    _proto.loadScript = function loadScript(id, src) {
      if (!document.querySelector("#" + id)) {
        var script = document.createElement('script');
        script.src = src;
        script.id = id;
        script.async = true;
        script.defer = true;
        this.logger.debug('Loading Script...', script);
        document.head.appendChild(script);
      }

      this.element.setAttribute('data-script', this.getScriptId());
    };

    _proto.recaptchaExecute = function recaptchaExecute() {
      throw new Error('Method is to be implemented in each extended class.');
    };

    _proto.registerExecuteEvent = function registerExecuteEvent() {
      var _this = this;

      var eventName = "grecaptcha:execute:" + this.id;
      this.__auevents__[eventName] = this.events.subscribe(eventName, function () {
        _this.logger.debug("Triggered " + eventName);

        _this.recaptchaExecute();
      });
    };

    _proto.registerExecuteWatcher = function registerExecuteWatcher() {
      var _this2 = this;

      var eventName = "grecaptcha:execute:" + this.id;
      this.__watchers__[eventName] = setInterval(function () {
        if (_this2.auto && !_this2.value) {
          _this2.events.publish(eventName);
        }
      }, 2000);
    };

    _proto.removeAutoTriggerExecuteEvent = function removeAutoTriggerExecuteEvent() {
      clearInterval(this.__grecaptcha_auto_exec_interval__);
    };

    _proto.unregisterEvents = function unregisterEvents() {
      var _arr = Object.keys(this.__auevents__);

      for (var _i = 0; _i < _arr.length; _i++) {
        var key = _arr[_i];

        if (typeof this.__auevents__[key].dispose === 'function') {
          this.__auevents__[key].dispose();

          delete this.__auevents__[key];
        }
      }
    };

    _proto.unregisterWatchers = function unregisterWatchers() {
      var _arr2 = Object.keys(this.__watchers__);

      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var key = _arr2[_i2];
        clearInterval(this.__watchers__[key]);
        delete this.__watchers__[key];
      }
    };

    return RecaptchaBase;
  }(), _class3.HASH = getHash(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "auto", [_aureliaFramework.bindable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec3], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "sitekey", [_aureliaFramework.bindable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return '';
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec4], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return false;
    }
  })), _class2)) || _class) || _class);
  _exports.RecaptchaBase = RecaptchaBase;
});