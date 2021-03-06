;(function () {
var bluebird_original = window.Promise;
if (window.Promise !== window.P) {
console.warn('Bluebird is not available, cancel and progress will not work');
}
var bluebird, src_utils_utils, src_utils_mappers, src_utils_http, src_events_notifier, src_sources_Source, src_sources_private_mappers_folder, src_sources_private_parsers_error, src_sources_private_folders, src_sources_private_validators_new_props, src_sources_private_folder, src_sources_private_mappers_item, src_sources_private_items, src_sources_private_item, src_sources_private_itemstrash, src_sources_private_folderstrash, src_sources_private_settings, src_sources_decorators, src_events_list, src_services_channel_channel, src_sources_private_Private, src_sources_picasa_settings, src_sources_picasa_mappers_folder, src_sources_picasa_parsers_folders, src_sources_picasa_parsers_error, src_sources_picasa_folders, src_sources_picasa_mappers_item, src_sources_picasa_parsers_items, src_sources_picasa_items, src_sources_picasa_Picasa, src_sources_instagram_settings, src_sources_instagram_mappers_folder, src_sources_instagram_parsers_folders, src_sources_instagram_parsers_error, src_sources_instagram_folders, src_sources_instagram_mappers_item, src_sources_instagram_parsers_items, src_sources_instagram_items, src_sources_instagram_Instagram, src_sources_facebook_settings, src_sources_facebook_mappers_folder, src_sources_facebook_parsers_folders, src_sources_facebook_parsers_error, src_sources_facebook_folders, src_sources_facebook_mappers_item, src_sources_facebook_parsers_items, src_sources_facebook_items, src_sources_facebook_Facebook, src_sources_flickr_settings, src_sources_flickr_mappers_folder, src_sources_flickr_parsers_folders, src_sources_flickr_parsers_error, src_sources_flickr_folders, src_sources_flickr_mappers_item, src_sources_flickr_parsers_items, src_sources_flickr_items, src_sources_flickr_Flickr, src_sources_list, src_events_events, src_connector_connector_settings, src_connector_connector, src_services_bi_events_ids, src_services_bi_request, src_services_bi_bi, src_services_upload_file_to_upload, src_services_upload_upload_collection, src_wixmp;
(function (e) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = e(P);
  } else if (true) {
    bluebird = function (bluebird_original) {
      return typeof e === 'function' ? e(bluebird_original) : e;
    }(bluebird_original);
  } else {
    var f;
    typeof window !== 'undefined' ? f = window : typeof global !== 'undefined' ? f = global : typeof self !== 'undefined' && (f = self), f.Promise = e(P);
  }
}(function (Promise) {
  Promise.defer = function () {
    var resolve, reject;
    var promise = new Promise(function () {
      resolve = arguments[0];
      reject = arguments[1];
    });
    promise.cancellable();
    return {
      resolve: resolve,
      reject: reject,
      promise: promise
    };
  };
  Promise.prototype.abort = function () {
    this.cancel({
      message: 'aborted_by_user',
      code: -100
    });
  };
  Promise.prototype.progress = function (callback) {
    this._progressCallback = callback;
    return this;
  };
  Promise.prototype.notify = function (message) {
    if (typeof this._progressCallback === 'function') {
      this._progressCallback(message);
    }
    return this;
  };
  return Promise;
}));
src_utils_utils = function (Promise) {
  function minMaxFinder(method, arr, predicate) {
    var mappedArr;
    if (predicate) {
      mappedArr = arr.map(predicate);
      return arr[mappedArr.indexOf(Math[method].apply(null, mappedArr))];
    }
    return Math[method].apply(this, arr);
  }
  var utils = {
    /**
     * Extend object values with sources objects data
     * @param dest {Object}
     * @param source.. {Object}
     * @returns {*}
     */
    extend: function (dest) {
      var sources = Array.prototype.slice.call(arguments, 1);
      sources.forEach(function (source) {
        if (typeof source === 'object' && source !== null) {
          Object.keys(source).forEach(function (key) {
            dest[key] = source[key];
          });
        }
      });
      return dest;
    },
    merge: function () {
      var hop = Object.prototype.hasOwnProperty;
      return Array.prototype.reduce.call(arguments, function (result, source) {
        Object.keys(result).forEach(function (key) {
          if (hop.call(source, key)) {
            result[key] = source[key];
          }
        });
        Object.keys(source).forEach(function (key) {
          result[key] = source[key];
        });
        return result;
      }, {});
    },
    bytesToSize: function (bytes) {
      if (bytes === 0) {
        return '0 Byte';
      }
      var k = 1024;
      var sizes = [
        'Bytes',
        'KB',
        'MB',
        'GB',
        'TB',
        'PB',
        'EB',
        'ZB',
        'YB'
      ];
      var i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    },
    /**
     * Return function with preset arguments
     * @param func {Function}
     * @param [argument..] {*}
     * @returns {Function}
     */
    partial: function (func) {
      var partialArguments = Array.prototype.slice.call(arguments, 1);
      return function () {
        var args = Array.prototype.slice.call(arguments);
        return func.apply(this, partialArguments.concat(args));
      };
    },
    getParameterByName: function (searchString, name) {
      var regex, results;
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      results = regex.exec(searchString);
      if (!results) {
        return '';
      }
      return decodeURIComponent(results[1].replace(/\+/g, ' '));
    },
    snakeToCamel: function (string) {
      return string.replace(/(\_[a-z])/g, function ($1) {
        return $1.toUpperCase().replace('_', '');
      });
    },
    find: function (arr, predicate) {
      var found;
      arr.some(function (el) {
        if (predicate(el) === true) {
          found = el;
          return true;
        }
      });
      return found;
    },
    encodeParams: function (a) {
      var s = [], add = function (key, value) {
          s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
        };
      Object.keys(a).forEach(function (entity) {
        add(entity, a[entity]);
      });
      return s.join('&').replace(/%20/g, '+');
    },
    insertDataInTemplate: function (template, data) {
      function createRegexp(t, options) {
        t = t.replace(/[()\[\]\.^$|?+]/g, '\\$&');
        return new RegExp(t, options);
      }
      Object.keys(data).forEach(function (key) {
        template = template.replace(createRegexp('#' + key + '#', 'g'), data[key]);
      });
      return template;
    },
    transformModeToVangogh: function (mode) {
      var vangoghModes = {
        fill: 'srz',
        fit: 'srb'
      };
      return vangoghModes[mode];
    },
    splitTags: function (tags) {
      if (!tags) {
        return [];
      }
      if (Array.isArray(tags)) {
        return tags;
      }
      return tags.split(/\s*,\s*/);
    },
    normalizeUri: function (uri) {
      if (typeof uri !== 'string') {
        throw new Error('URI is not a string');
      }
      return uri.replace(/([a-z\-_0-9]+)\/\//gi, '$1/');
    },
    getScript: function (src) {
      return new Promise(function (resolve, reject) {
        var head = document.getElementsByTagName('head')[0], script = document.createElement('script'), done = false;
        script.src = src;
        script.onload = script.onreadystatechange = function () {
          if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
            done = true;
            resolve();
            script.onload = script.onreadystatechange = null;
            if (head && script.parentNode) {
              head.removeChild(script);
            }
          } else {
            reject();
          }
        };
        head.insertBefore(script, head.firstChild);
      });
    },
    isGuid: function (guid) {
      return /^\w{8}-(\w{4}-){3}\w{12}(:\w+)?$/.test(guid);
    }
  };
  utils.min = utils.partial(minMaxFinder, 'min');
  utils.max = utils.partial(minMaxFinder, 'max');
  return utils;
}(bluebird);
src_utils_mappers = {
  toObject: function (data) {
    if (!data) {
      return null;
    }
    if (typeof data === 'string') {
      if ([
          '{',
          '['
        ].indexOf(data[0]) >= 0) {
        return JSON.parse(data);
      }
      return { message: data };
    }
    return data;
  },
  toError: function (error) {
    return {
      code: error.status || error.code,
      message: error.statusText || error.message || error.data.message || error.data.error && error.data.error.message || '',
      data: error.data && (error.data.errors || error.data.error || error.data)
    };
  }
};
src_utils_http = function (Promise, utils, mappers) {
  var defaultOptions = {
    withCredentials: false,
    cache: true,
    headers: { Accept: 'application/json, text/plain, */*' }
  };
  function parseResponse(response) {
    if (typeof response === 'string') {
      if ([
          '{',
          '['
        ].indexOf(response[0]) >= 0) {
        response = JSON.parse(response);
      } else {
        response = { message: response };
      }
    }
    return response;
  }
  function parseRequest(request) {
    return {
      status: request.status,
      statusText: request.statusText,
      data: parseResponse(request.responseText)
    };
  }
  function encode(val) {
    return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+');
  }
  function wrapRequestWithPromise(request, callSend, hasProgress) {
    var promise = new Promise(function (resolve, reject) {
      request.addEventListener('error', function () {
        reject(mappers.toError(utils.extend({}, request, {
          message: 'error',
          code: -201
        })));
      }, false);
      request.addEventListener('timeout', function () {
        reject(mappers.toError(utils.extend({}, request, {
          message: 'timeout_has_exceeded',
          code: 408
        })));
      }, false);
      request.addEventListener('load', function () {
        if (request.status.toString().match(/^2\d+/i)) {
          resolve(parseRequest(request));
        } else {
          reject(mappers.toError(utils.extend({}, request, {
            message: 'error',
            code: request.status,
            data: mappers.toObject(request.responseText)
          })));
        }
      }, false);
    });
    if (hasProgress) {
      request.upload.onprogress = function (event) {
        var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
        var status = progress <= 99 ? 'uploading' : 'processing';
        promise.notify({
          status: status,
          total: event.total,
          loaded: event.loaded
        });
      };
    } else {
      request.addEventListener('loadstart', function (event) {
        if (!event) {
          return;
        }
        promise.notify({
          status: 'uploading',
          total: event.total,
          loaded: event.loaded
        });
      }, false);
      request.addEventListener('loadend', function (event) {
        if (!event) {
          return;
        }
        promise.notify({
          status: 'processing',
          total: event.total,
          loaded: event.loaded
        });
      }, false);
    }
    promise.cancellable().catch(function (reason) {
      if (reason.message === 'aborted_by_user') {
        request.abort();
      }
    });
    callSend();
    return promise;
  }
  function buildUrl(url, params) {
    if (!params) {
      return url;
    }
    var parts = [];
    Object.keys(params).forEach(function (key) {
      var val = params[key];
      if (val === null || typeof val === 'undefined') {
        return;
      }
      if (!(val instanceof Array)) {
        val = [val];
      }
      val.forEach(function (v) {
        if (v instanceof Date && !isNaN(v.valueOf())) {
          v = v.toISOString();
        } else if (typeof v === 'object') {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });
    if (parts.length > 0) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&');
    }
    return url;
  }
  function openRequest(method, url, options) {
    var request = new XMLHttpRequest();
    if (options.cache === false) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + '_=' + Date.now();
    }
    request.open(method.toUpperCase(), utils.normalizeUri(url));
    if (options.responseType) {
      request.responseType = options.responseType;
    }
    request.withCredentials = options.withCredentials;
    Object.keys(options.headers).forEach(function (name) {
      request.setRequestHeader(name, options.headers[name]);
    });
    return request;
  }
  function get(url, data, options) {
    var request = openRequest('get', buildUrl(url, data), utils.extend({}, defaultOptions, options));
    return wrapRequestWithPromise(request, function () {
      request.send(null);
    });
  }
  function post(url, data, options) {
    var request = openRequest('post', url, utils.extend({}, defaultOptions, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }, options));
    return wrapRequestWithPromise(request, function () {
      if (data && typeof data === 'object' && data instanceof FormData === false) {
        data = JSON.stringify(data);
      }
      request.send(data);
    });
  }
  function upload(url, multipart, options) {
    var fd, request = openRequest('post', url, utils.extend({}, defaultOptions, options));
    fd = new FormData();
    Object.keys(multipart).forEach(function (name) {
      var value = multipart[name];
      var args = name === 'file' ? [
        name,
        value,
        value.name
      ] : [
        name,
        value
      ];
      return fd.append.apply(fd, args);
    });
    return wrapRequestWithPromise(request, function () {
      request.send(fd);
    }, true);
  }
  function makeRetriable(method) {
    return function () {
      var self = this, args = arguments, firstPromise;
      function callMethod() {
        return method.apply(self, args);
      }
      firstPromise = callMethod();
      var promise = new Promise(function (resolve, reject) {
        firstPromise.then(resolve, function (reason) {
          if (reason.message === 'aborted_by_user' || reason.code === 406) {
            reject(reason);
            return Promise.reject(reason);
          }
          return callMethod();
        }).then(resolve, reject);
      });
      firstPromise.progress(function (progress) {
        promise.notify(progress);
      });
      promise.cancellable().catch(function (reason) {
        if (reason.message === 'aborted_by_user') {
          firstPromise.abort();
        }
      });
      return promise;
    };
  }
  return {
    get: makeRetriable(get),
    post: makeRetriable(post),
    upload: makeRetriable(upload)
  };
}(bluebird, src_utils_utils, src_utils_mappers);
src_events_notifier = function (Promise) {
  var listeners = {};
  function noop() {
  }
  function callEach(functions, data) {
    functions.forEach(function (currentFunction) {
      currentFunction(data);
    });
  }
  function callEachAtIndex(functions, index, data) {
    functions.forEach(function (functions) {
      functions[index](data);
    });
  }
  function emitWithArrayOfPromises(eventTarget, eventName, params) {
    // no listeners
    if (typeof listeners[eventName] === 'undefined') {
      return {
        resolveAt: noop,
        rejectAt: noop
      };
    }
    var resolvers = [], rejectors = [];
    listeners[eventName].forEach(function (listener) {
      var thisEventResolvers = [], thisEventRejectors = [], eventPromises = params.promises.map(function () {
          return new Promise(function (resolve, reject) {
            thisEventResolvers.push(resolve);
            thisEventRejectors.push(reject);
          });
        });
      resolvers.push(thisEventResolvers);
      rejectors.push(thisEventRejectors);
      listener(eventPromises, params);
    });
    return {
      resolveAt: function (index, data) {
        callEachAtIndex(resolvers, index, data);
      },
      rejectAt: function (index, data) {
        callEachAtIndex(rejectors, index, data);
      }
    };
  }
  function emit(eventTarget, eventName, params) {
    if (typeof eventTarget !== 'object' || eventTarget === null) {
      throw new Error('target should be a function');
    }
    if (typeof eventName !== 'string') {
      throw new Error('eventName should be a string');
    }
    params = params || {};
    params.eventTarget = eventTarget;
    params.eventName = eventName;
    if (params.promises && params.promises.length) {
      return emitWithArrayOfPromises(eventTarget, eventName, params);
    }
    // no listeners
    if (typeof listeners[eventName] === 'undefined') {
      return {
        resolve: noop,
        reject: noop
      };
    }
    var resolvers = [], rejectors = [];
    listeners[eventName].forEach(function (listener) {
      var promise = new Promise(function (resolveCurrent, rejectCurrent) {
        resolvers.push(resolveCurrent);
        rejectors.push(rejectCurrent);
      });
      listener(promise, params);
    });
    return {
      resolve: function (data) {
        callEach(resolvers, data);
      },
      reject: function (reason) {
        callEach(rejectors, reason);
      }
    };
  }
  /**
   * @summary Subscribe listener to event
   * @name on
   * @memberof wixmp.events
   * @method
   * @param eventName {String} Event name
   * @param listener {Function} Callback function that is when corresponding method is fired
   */
  function addListener(eventName, listener) {
    if (typeof listeners[eventName] === 'undefined') {
      listeners[eventName] = [];
    }
    listeners[eventName].push(listener);
  }
  /**
   * @summary Unsubscribe listener from event
   * @name off
   * @memberof wixmp.events
   * @method
   * @param eventName {String} Event name
   * @param listener {Function} Callback function
   */
  function removeListener(eventName, listener) {
    if (listeners[eventName]) {
      var index = listeners[eventName].indexOf(listener);
      listeners[eventName].splice(index, 1);
    }
  }
  return {
    emit: emit,
    addListener: addListener,
    removeListener: removeListener
  };
}(bluebird);
src_sources_Source = function (http, notifier) {
  /**
   * @summary The constructor function of a source
   * @namespace Source
   * @class
   * @memberof wixmp
   * @param {Function} Source constructor function
   * @param {Object} Source settings
   */
  return function (SourceConstructor, settings) {
    if (typeof SourceConstructor !== 'function') {
      throw new Error('Source constructor should be a function');
    }
    if (typeof settings !== 'undefined' && (typeof settings !== 'object' || settings === null)) {
      throw new Error('Source settings should be an object');
    }
    return new SourceConstructor(settings, notifier.emit, http);
  };
}(src_utils_http, src_events_notifier);
src_sources_private_mappers_folder = function (folderData) {
  return {
    id: folderData.folder_id,
    parentId: folderData.parent_folder_id || null,
    name: folderData.folder_name,
    mediaType: folderData.media_type,
    filesCount: folderData.files_count,
    createdAt: folderData.created_ts
  };
};
src_sources_private_parsers_error = function (Promise) {
  return function (response) {
    if (response.status === 403 && response.data.error_description === 'Missing Wix session') {
      response.status = 401;
      response.data.message = 'Wix Session required';
    }
    return Promise.reject(response);
  };
}(bluebird);
src_sources_private_folders = function (http, toFolder, toError) {
  return function (settings) {
    function failHandler(reason) {
      return toError(reason);
    }
    function toFoldersList(res) {
      if (!res.data.folders) {
        return [];
      }
      return res.data.folders.map(toFolder);
    }
    /**
     * @summary Return the list of folders
     * @memberof source.folders
     * @param {String} folderId
     * @param {ListSettings} options
     * @returns {Promise}
     * @fulfill {List[]} List with Folders
     * @reject {Error}
     */
    function list(folderId, options) {
      options = options || {};
      return http.get(settings.apiUrl + '/folders', {
        media_type: options.mediaType || 'picture',
        folder_id: folderId || null
      }, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(function (response) {
        return { data: toFoldersList(response) };
      }).catch(failHandler);
    }
    function removeFolder(folderId, options) {
      return http.post(settings.apiUrl + '/folders/' + folderId + '/delete', null, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(function () {
        return folderId;
      }).catch(failHandler);
    }
    /**
     * @summary Removes the list of folders with given ids
     * @memberof source.folders
     * @param {string[]} folderIds Array of folder ids
     * @returns {Promise}
     */
    function remove(folderIds, options) {
      options = options || {};
      return folderIds.map(function (folderId) {
        return removeFolder(folderId, options);
      });
    }
    return {
      list: list,
      remove: remove
    };
  };
}(src_utils_http, src_sources_private_mappers_folder, src_sources_private_parsers_error);
src_sources_private_validators_new_props = function (newProps) {
  if (typeof newProps !== 'object' || newProps === null) {
    return {
      valid: false,
      message: 'Please specify new props'
    };
  }
  if (typeof newProps.name !== 'undefined' && !newProps.name) {
    return {
      valid: false,
      message: 'Please specify name'
    };
  }
  if (typeof newProps.folderId !== 'undefined' && !newProps.folderId) {
    return {
      valid: false,
      message: 'Please specify folder id'
    };
  }
  if (typeof newProps.parentId !== 'undefined' && !newProps.parentId) {
    return {
      valid: false,
      message: 'Please specify parent folder id'
    };
  }
  if (typeof newProps.tags !== 'undefined' && !Array.isArray(newProps.tags)) {
    return {
      valid: false,
      message: 'Tags should be an array'
    };
  }
  return { valid: true };
};
src_sources_private_folder = function (http, mappers, utils, toFolder, toError, validateNewProps) {
  return function (settings) {
    function failHandler(reason) {
      return toError(reason);
    }
    /**
     * @summary Create a new folder with given name and parameters
     * @memberof source.folder
     * @param {string} folderName
     * @param {object} options
     * @param {string} options.mediaType
     * @param {string} options.parentId
     * @returns {Promise}
     * @fulfill {Folder} New folder object
     * @reject {Error}
     */
    function create(folderName, options) {
      if (!folderName) {
        return failHandler(mappers.toError({
          status: -200,
          statusText: 'Internal JS Error',
          data: { message: 'Please specify name' }
        }));
      }
      options = options || {};
      return http.post(settings.apiUrl + '/folders', {
        folder_name: folderName,
        media_type: options.mediaType || 'picture',
        parent_folder_id: options.parentId || null
      }, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(function (res) {
        res.data = toFolder(res.data);
        return res;
      }).catch(failHandler);
    }
    /**
     * @summary Updates the folder with given diff object
     * @memberof source.folder
     * @param {Folder} folder Current folder object that should be updated
     * @param {object} newFolderProps
     * @returns {Promise}
     * @fulfill {Folder} Modified folder object
     * @reject {Error}
     */
    function update(folder, newFolderProps, options) {
      var arePropsValid = validateNewProps(newFolderProps);
      if (arePropsValid.valid === false) {
        return failHandler(mappers.toError({
          status: -200,
          statusText: 'Internal JS Error',
          data: { message: arePropsValid.message }
        }));
      }
      var propsToUpdate = {};
      if (newFolderProps.name) {
        propsToUpdate.folder_name = newFolderProps.name;
      }
      if (newFolderProps.parentId) {
        propsToUpdate.parent_folder_id = newFolderProps.parentId;
      }
      options = options || {};
      return http.post(settings.apiUrl + '/folders/' + folder.id + '/put', propsToUpdate, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(function (res) {
        res.data = utils.extend({}, folder, newFolderProps);
        return res;
      }).catch(failHandler);
    }
    return {
      create: create,
      update: update
    };
  };
}(src_utils_http, src_utils_mappers, src_utils_utils, src_sources_private_mappers_folder, src_sources_private_parsers_error, src_sources_private_validators_new_props);
src_sources_private_mappers_item = function (mappers, utils) {
  var normalizeUri = utils.normalizeUri;
  function rembrandtCompile(item, settings, doNotCutNameFromId) {
    var regexp = /([^\/]+)$/;
    function cutNameFromId(id) {
      if (doNotCutNameFromId) {
        return id;
      }
      return id.replace(regexp, '');
    }
    function getFileName(id) {
      return regexp.exec(id)[1];
    }
    var templates = {};
    if (item.file_url) {
      templates.original = normalizeUri(settings.filesUrl + '/' + item.file_url);
    }
    if (item.icon_url) {
      templates.thumbnail = normalizeUri(settings.filesUrl + '/' + item.icon_url);
    }
    switch (item.media_type) {
    case 'picture':
    case 'site_icon':
      if (item.file_url) {
        templates.thumbnail = normalizeUri(settings.filesUrl + '/' + cutNameFromId(item.file_url) + '/v1/#mode#/w_#width#,h_#height#/' + getFileName(item.file_url));
      }
      break;
    //TODO: use proper preview
    case 'video':
      templates.thumbnail = item.icon_url ? normalizeUri(settings.filesUrl + '/' + item.icon_url) : './images/video-preview.png';
      break;
    case 'ufonts':
      templates.preview = normalizeUri(settings.filesUrl + '/media' + item.file_name.replace(/\..*/, '') + '_prvw.jpg');
      break;
    default:
      break;
    }
    return templates;
  }
  function vangoghCompile(item, settings) {
    var templates = {};
    if (item.file_url) {
      templates.original = normalizeUri(settings.filesUrl + '/' + item.file_url);
    }
    if (item.icon_url) {
      templates.thumbnail = normalizeUri(settings.filesUrl + '/' + item.icon_url);
    }
    switch (item.media_type) {
    case 'picture':
    case 'site_icon':
      if (item.file_url) {
        templates.thumbnail = normalizeUri(settings.filesUrl + '/' + item.file_url + '_#mode#_#width#_#height#_75_22_0.5_1.20_0.00_jpg_#mode#');
      }
      break;
    case 'ufonts':
      templates.preview = normalizeUri(settings.filesUrl + '/media' + item.file_name.replace(/\..*/, '') + '_prvw.jpg');
      break;
    default:
      break;
    }
    return templates;
  }
  function compileUrlsTemplate(item, settings) {
    if (settings.imageOperationsApi === 'rembrandt') {
      return rembrandtCompile(item, settings);
    }
    if (settings.imageOperationsApi === 'vanbrandt') {
      return rembrandtCompile(item, settings, true);
    }
    return vangoghCompile(item, settings);
  }
  return function (itemData, settings, thumbnailSizes, undefinedInsteadOfNull) {
    function insertSizes(urlsTemplate) {
      return Object.keys(thumbnailSizes).reduce(function (compiledUrls, thumbType) {
        var compiledUrlKey = thumbType + 'Url', thumbSizeData = utils.extend({}, thumbnailSizes[thumbType]), urlTemplate = urlsTemplate[thumbType] || urlsTemplate.thumbnail;
        if (!urlTemplate) {
          return compiledUrls;
        }
        if (settings.imageOperationsApi === 'vangogh') {
          thumbSizeData.mode = utils.transformModeToVangogh(thumbSizeData.mode);
        }
        compiledUrls[compiledUrlKey] = utils.insertDataInTemplate(urlTemplate, thumbSizeData);
        return compiledUrls;
      }, {});
    }
    var defaultValue = undefinedInsteadOfNull ? undefined : null;
    var item = {
      id: itemData.file_name,
      folderId: itemData.parent_folder_id || defaultValue,
      name: itemData.original_file_name,
      mediaType: itemData.media_type,
      fileUrl: itemData.file_url ? normalizeUri(itemData.file_url) : defaultValue,
      createdAt: itemData.created_ts,
      tags: utils.splitTags(itemData.tags),
      width: itemData.width || defaultValue,
      height: itemData.height || defaultValue,
      fileInfo: itemData.file_info ? mappers.toObject(itemData.file_info) : defaultValue,
      fileInput: itemData.file_input ? mappers.toObject(itemData.file_input) : defaultValue,
      fileOutput: itemData.file_output ? mappers.toObject(itemData.file_output) : defaultValue,
      transcodingStatus: itemData.op_status
    };
    thumbnailSizes = utils.extend({}, settings.thumbnailSizes, thumbnailSizes);
    utils.extend(item, insertSizes(compileUrlsTemplate(itemData, settings)));
    Object.keys(item).forEach(function (prop) {
      if (item[prop] === undefined) {
        delete item[prop];
      }
    });
    return item;
  };
}(src_utils_mappers, src_utils_utils);
src_sources_private_items = function (Promise, http, utils, toItem, toError) {
  return function (settings) {
    function failHandler(reason) {
      return toError(reason);
    }
    function toItemsList(res, thumbnailSizes) {
      if (!res.data.files) {
        return [];
      }
      return res.data.files.map(function (item) {
        return toItem(item, settings, thumbnailSizes);
      });
    }
    var defaultPaging = {
      size: 50,
      cursor: null
    };
    var defaultSort = {
      order: 'date',
      direction: 'desc'
    };
    /**
     * @summary Returns the list of items from the given folder
     * @memberof source.items
     * @param {string} folderId
     * @param {ListSettings} options
     * @returns {Promise}
     * @fulfill {List}
     * @reject {Error}
     */
    function list(folderId, options) {
      options = options || {};
      var sort = utils.extend({}, defaultSort, options.sort);
      var paging = utils.extend({}, defaultPaging, options.paging);
      var queryParams = {
        page_size: paging.size,
        cursor: paging.cursor,
        parent_folder_id: folderId,
        media_type: options.mediaType || 'picture'
      };
      queryParams.order = sort.direction === 'desc' ? '-' + sort.order : sort.order;
      return http.get(settings.apiUrl + '/files/getpage', queryParams, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(function (response) {
        return {
          data: toItemsList(response, options.thumbnails),
          paging: {
            size: paging.size,
            cursor: response.data.cursor
          }
        };
      }).catch(failHandler);
    }
    function removeItem(itemId, options) {
      return http.post(settings.apiUrl + '/files/' + itemId + '/delete', null, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(function () {
        return itemId;
      }).catch(failHandler);
    }
    /**
     * @summary Removes the items with given ids
     * @memberof source.items
     * @param {Array} itemsId
     * @returns {Array}
     */
    function remove(itemsId, options) {
      options = options || {};
      return itemsId.map(function (itemId) {
        return removeItem(itemId, options);
      });
    }
    /**
     * @summary Return list of items found by tag
     * @memberof source.items
     * @param {string} tag
     * @param {ListSettings} options
     * @returns {Promise}
     * @fulfill {List}
     * @reject {Error}
     */
    function searchByTag(tag, options) {
      options = options || {};
      var sort = utils.extend({}, defaultSort, options.sort);
      var paging = utils.extend({}, defaultPaging, options.paging);
      var queryParams = {
        page_size: paging.size,
        cursor: paging.cursor,
        media_type: options.mediaType || 'picture',
        order: sort.direction === 'desc' ? '-' + sort.order : sort.order
      };
      return http.get(settings.apiUrl + '/files/get?tag=' + tag, queryParams, {
        withCredentials: true,
        cache: false,
        headers: options.headers || {}
      }).then(function (response) {
        return {
          data: toItemsList(response),
          paging: {
            size: paging.size,
            cursor: response.data.cursor
          }
        };
      }).catch(failHandler);
    }
    return {
      list: list,
      remove: remove,
      searchByTag: searchByTag
    };
  };
}(bluebird, src_utils_http, src_utils_utils, src_sources_private_mappers_item, src_sources_private_parsers_error);
src_sources_private_item = function (Promise, http, utils, toItem, toError, validateNewProps, mappers) {
  return function (settings) {
    var uploadProgressEvents = [];
    function getFilesSizeLimit(mediaType) {
      return settings.uploadLimits[utils.snakeToCamel(mediaType)];
    }
    function fileSizeIsInvalid(fileSource) {
      return fileSource.file.size >= getFilesSizeLimit(fileSource.mediaType);
    }
    function onItemUploadProgress(callback) {
      if (typeof callback === 'function') {
        uploadProgressEvents.push(callback);
      }
    }
    function failHandler(reason) {
      return toError(reason);
    }
    function getUploadUrl(fileSource) {
      function getEndpoind(mediaType) {
        if (mediaType === 'secure_music') {
          return 'music-goods/upload';
        } else if (mediaType === 'video') {
          return 'video/upload';
        }
        return 'upload';
      }
      return http.get(settings.apiUrl + '/files/' + getEndpoind(fileSource.mediaType) + '/url', {
        media_type: fileSource.mediaType,
        file_name: '_.' + fileSource.name.split('.').pop(),
        file_size: fileSource.size,
        content_type: fileSource.file.type
      }, { withCredentials: true });
    }
    function uploadByUrl(fileSource, options) {
      options = options || {};
      var params = {
        url: utils.normalizeUri(fileSource.url),
        media_type: fileSource.mediaType,
        name: fileSource.name || 'Untitled',
        tags: (fileSource.tags || []).join(',') || null,
        parent_folder_id: fileSource.folderId || null
      };
      var apiUrl = settings.apiUrl + '/files/upload/external';
      var uploadPromise = http.get(apiUrl, params, {
        withCredentials: true,
        headers: options.headers || {}
      }).progress(function (progress) {
        uploadPromise.notify(progress);
      }).then(function (response) {
        return toItem(response.data, settings);
      });
      return uploadPromise;
    }
    function upload(fileSource, options) {
      options = options || {};
      var fileToUpload = {
        parent_folder_id: fileSource.folderId || null,
        file: fileSource.file,
        media_type: fileSource.mediaType
      };
      if (fileSizeIsInvalid(fileSource)) {
        return Promise.reject(mappers.toError({
          status: -406,
          statusText: 'Not Acceptable',
          data: { error_description: 'File size is bigger than ' + utils.bytesToSize(getFilesSizeLimit(fileSource.mediaType)) }
        }));
      }
      var uploadPromiseChain = getUploadUrl(fileSource).then(function (response) {
        fileToUpload.upload_token = response.data.upload_token;
        return http.upload(response.data.upload_url, fileToUpload, {
          withCredentials: true,
          headers: options.headers || {}
        }).progress(function (progress) {
          uploadPromiseChain.notify(progress);
        });
      }).then(function (response) {
        return toItem(response.data[0], settings);
      });
      return uploadPromiseChain;
    }
    /**
     * @summary Returns items
     * @memberof source.item
     * @param {string} itemId
     * @returns {Promise}
     * @fulfill {Item}
     * @reject {Error}
     */
    function get(itemId, options) {
      options = options || {};
      return http.get(settings.apiUrl + '/files/' + itemId, null, {
        withCredentials: true,
        cache: false,
        headers: options.headers || {}
      }).then(function (result) {
        return toItem(result.data, settings);
      }).catch(failHandler);
    }
    /**
     * @summary Updates the item with given diff object
     * @memberof source.item
     * @param {Item} item Current item object that should be updated
     * @param {object} newItemProps
     * @returns {Promise}
     * @fulfill {Item} Modified item object
     * @reject {Error}
     */
    function update(item, newItemProps, options) {
      var arePropsValid = validateNewProps(newItemProps);
      if (arePropsValid.valid === false) {
        return failHandler(mappers.toError({
          status: -200,
          statusText: 'Internal JS Error',
          data: { message: arePropsValid.message }
        }));
      }
      var propsToUpdate = {};
      if (newItemProps.name) {
        propsToUpdate.original_file_name = newItemProps.name;
      }
      if (newItemProps.folderId) {
        propsToUpdate.parent_folder_id = newItemProps.folderId;
      }
      if (newItemProps.tags) {
        propsToUpdate.tags = newItemProps.tags.join(',');
      }
      options = options || {};
      return http.post(settings.apiUrl + '/files/' + item.id + '/put', propsToUpdate, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(function (res) {
        res.data = utils.extend({}, item, newItemProps);
        return res;
      }).catch(failHandler);
    }
    return {
      onItemUploadProgress: onItemUploadProgress,
      upload: upload,
      uploadByUrl: uploadByUrl,
      get: get,
      update: update
    };
  };
}(bluebird, src_utils_http, src_utils_utils, src_sources_private_mappers_item, src_sources_private_parsers_error, src_sources_private_validators_new_props, src_utils_mappers);
src_sources_private_itemstrash = function (Promise, http, utils, toItem, toError) {
  return function (settings) {
    function failHandler(reason) {
      return toError(reason);
    }
    function toItemList(res, thumbnailSizes) {
      if (!res.data.trash_files) {
        return [];
      }
      return res.data.trash_files.map(function (_item) {
        var item = toItem(_item, settings, thumbnailSizes);
        item.isInTrash = true;
        return item;
      });
    }
    var defaultPaging = {
      size: 50,
      cursor: null
    };
    var defaultSort = {
      order: 'date',
      direction: 'desc'
    };
    function list(folderId, options) {
      options = options || {};
      var sort = utils.extend({}, defaultSort, options.sort);
      var paging = utils.extend({}, defaultPaging, options.paging);
      var queryParams = {
        page_size: paging.size,
        cursor: paging.cursor,
        parent_folder_id: folderId,
        media_type: options.mediaType || 'picture'
      };
      queryParams.order = sort.direction === 'desc' ? '-' + sort.order : sort.order;
      return http.get(settings.apiUrl + '/files/getpage/trash', queryParams, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(function (response) {
        return {
          data: toItemList(response, options.thumbnails),
          paging: {
            size: paging.size,
            cursor: response.data.cursor
          }
        };
      }).catch(failHandler);
    }
    function removeItem(itemId, options) {
      return http.post(settings.apiUrl + '/trash/files/' + itemId + '/delete', null, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(function () {
        return itemId;
      }).catch(failHandler);
    }
    function remove(itemsId, options) {
      options = options || {};
      return itemsId.map(function (itemId) {
        return removeItem(itemId, options);
      });
    }
    function restoreItem(itemId, options) {
      return http.post(settings.apiUrl + '/trash/files/' + itemId + '/restore', null, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(function () {
        return itemId;
      }).catch(failHandler);
    }
    function restore(itemsId, options) {
      options = options || {};
      return itemsId.map(function (itemId) {
        return restoreItem(itemId, options);
      });
    }
    return {
      list: list,
      remove: remove,
      restore: restore
    };
  };
}(bluebird, src_utils_http, src_utils_utils, src_sources_private_mappers_item, src_sources_private_parsers_error);
src_sources_private_folderstrash = function (Promise, http, utils, toFolder, toError) {
  return function (settings) {
    function failHandler(reason) {
      return toError(reason);
    }
    function toFoldersList(res) {
      if (!res.data.trash_folders) {
        return [];
      }
      return res.data.trash_folders.map(function (_folder) {
        var folder = toFolder(_folder);
        folder.isInTrash = true;
        return folder;
      });
    }
    function list(folderId, options) {
      options = options || {};
      return http.get(settings.apiUrl + '/files/getpage/trash', {
        media_type: options.mediaType || 'picture',
        folder_id: folderId || null,
        trash_type: 'folder'
      }, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(function (response) {
        return { data: toFoldersList(response) };
      }).catch(failHandler);
    }
    function removeFolder(folderId, options) {
      return http.post(settings.apiUrl + '/trash/folders/' + folderId + '/delete', null, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(function () {
        return folderId;
      }).catch(failHandler);
    }
    function remove(folderIds, options) {
      options = options || {};
      return folderIds.map(function (folderId) {
        return removeFolder(folderId, options);
      });
    }
    function restoreFolder(folderId, options) {
      return http.post(settings.apiUrl + '/trash/folders/' + folderId + '/restore', null, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(function () {
        return folderId;
      }).catch(failHandler);
    }
    function restore(folderIds, options) {
      options = options || {};
      return folderIds.map(function (folderId) {
        return restoreFolder(folderId, options);
      });
    }
    return {
      list: list,
      remove: remove,
      restore: restore
    };
  };
}(bluebird, src_utils_http, src_utils_utils, src_sources_private_mappers_folder, src_sources_private_parsers_error);
src_sources_private_settings = {
  apiUrl: '//files.wix.com',
  imageOperationsApi: 'vangogh',
  filesUrl: '//static.wixstatic.com',
  uploadLimits: {
    default: 15728640,
    document: 15728640,
    picture: 15728640,
    music: 52428800,
    video: 524288000,
    secureMusic: 377487360
  },
  thumbnailSizes: {
    thumbnail: {
      width: 210,
      height: 210,
      mode: 'fill'
    },
    preview: {
      width: 375,
      height: 375,
      mode: 'fit'
    },
    original: {
      width: 1000,
      height: 1000,
      mode: 'fit'
    }
  },
  channel: {
    withCredentials: true,
    jsapiUrl: '/_ah/channel/jsapi',
    tokenUrl: '/users/channel'
  }
};
src_sources_decorators = function (Promise, notifier, utils) {
  function addEvents(eventsTarget, events, methods) {
    var methodsWithEvents = {};
    Object.keys(events).forEach(function (eventKey) {
      var methodName = utils.snakeToCamel(eventKey.toLowerCase());
      if (typeof methods[methodName] === 'object' && methods[methodName] !== null && typeof events[eventKey] === 'object' && events[eventKey] !== null) {
        methodsWithEvents[methodName] = addEvents(eventsTarget, events[eventKey], methods[methodName]);
        return;
      } else if (typeof methods[methodName] !== 'function') {
        return;
      }
      // define new method with event generation
      methodsWithEvents[methodName] = function () {
        // emit before event and call native method
        //var event = notifier.emit(eventsTarget, events[eventKey], {arguments: arguments});
        var args = arguments, promise = methods[methodName].apply(methods, args), params = { arguments: args }, event, wrapped;
        if (Array.isArray(promise)) {
          params.promises = promise;
          event = notifier.emit(eventsTarget, events[eventKey], params);
          promise.forEach(function (promise, index) {
            var wrappedInner = promise.then(function (data) {
              event.resolveAt(index, data);
            }, function (reason) {
              event.rejectAt(index, reason);
            });
            promise.progress(function (progress) {
              wrappedInner.notify(progress);
            });
          });
          return promise;
        }
        event = notifier.emit(eventsTarget, events[eventKey], params);
        wrapped = promise.then(function (data) {
          event.resolve(data);
          return data;
        }, function (reason) {
          event.reject(reason);
          return Promise.reject(reason);
        });
        promise.progress(function (progress) {
          wrapped.notify(progress);
        });
        return wrapped;
      };
    });
    return methodsWithEvents;
  }
  return { addEvents: addEvents };
}(bluebird, src_events_notifier, src_utils_utils);
src_events_list = {
  /**
   * @summary List of possible folders events
   * @enum
   * @memberof wixmp.events
   */
  FOLDERS: {
    LIST: 'folders.list',
    REMOVE: 'folders.remove',
    /**
     * @summary List of possible trashed folders events
     * @enum
     * @memberof wixmp.events.folders
     */
    TRASH: {
      LIST: 'folders.trash.list',
      RESTORE: 'folders.trash.restore',
      REMOVE: 'folders.trash.remove'
    }
  },
  /**
   * @summary List of possible folder events
   * @enum
   * @memberof wixmp.events
   */
  FOLDER: {
    CREATE: 'folder.create',
    UPDATE: 'folder.update',
    REMOVE: 'folder.remove'
  },
  /**
   * @summary List of possible items events
   * @enum
   * @memberof wixmp.events
   */
  ITEMS: {
    LIST: 'items.list',
    SEARCH: 'items.search',
    REMOVE: 'items.remove',
    UPLOAD: 'items.upload',
    UPLOAD_BY_URL: 'items.uploadByUrl',
    SEARCH_BY_TAG: 'items.searchByTag',
    /**
     * @summary List of possible trashed items events
     * @enum
     * @memberof wixmp.events.items
     */
    TRASH: {
      LIST: 'items.trash.list',
      RESTORE: 'items.trash.restore',
      REMOVE: 'items.trash.remove'
    }
  },
  /**
   * @summary List of possible item events
   * @enum
   * @memberof wixmp.events
   */
  ITEM: {
    GET: 'item.get',
    UPDATE: 'item.update',
    REMOVE: 'item.remove',
    UPLOAD: 'item.upload',
    UPLOAD_BY_URL: 'item.uploadByUrl'
  }
};
src_services_channel_channel = function (Promise, http, utils, notifier, eventsList) {
  return function (settings, adapter, itemMapper) {
    var channel = null, socket = null, jsApiAlreadyLoaded = false;
    function emitEvent(result) {
      var event = notifier.emit(adapter, eventsList.ITEM.UPDATE, {
        arguments: [
          result,
          result
        ]
      });
      event.resolve({ data: result });
    }
    function open() {
      function onMessage(message) {
        console.log('message received:', message);
        if (message.data === 'server connected') {
          return;
        }
        try {
          message = JSON.parse(message.data);
          console.log(message);
          if (message.type === 'status_update') {
            if (message.file.op_status === 'READY') {
              adapter.item.get(message.file.file_name).then(emitEvent);
            } else {
              var result = itemMapper(message.file, settings, {}, true);
              emitEvent(result);
            }
          }
        } catch (reason) {
          console.log('something is wrong:', reason, reason.stack);
        }
      }
      function onClose() {
        console.log('socket is closing');
        channel = null;
        socket = null;
      }
      var def = Promise.defer();
      if (channel && socket) {
        def.resolve();
      } else {
        var jsApiLoadPromise;
        if (jsApiAlreadyLoaded) {
          jsApiLoadPromise = Promise.resolve();
        } else {
          jsApiLoadPromise = utils.getScript(settings.apiUrl + settings.channel.jsapiUrl).then(function () {
            jsApiAlreadyLoaded = true;
          });
        }
        jsApiLoadPromise.then(function () {
          return http.get(settings.apiUrl + settings.channel.tokenUrl, null, { withCredentials: settings.channel.withCredentials });
        }).then(function (tokenData) {
          channel = new goog.appengine.Channel(tokenData.data.token);
          socket = channel.open();
          socket.onmessage = onMessage;
          socket.onclose = onClose;
          def.resolve();
        }).catch(function (reason) {
          console.log('something is wrong:', reason);
          def.reject(reason);
        });
      }
      return def.promise;
    }
    function close() {
      if (socket) {
        socket.close();
        channel = null;
        socket = null;
      }
    }
    return {
      open: open,
      close: close
    };
  };
}(bluebird, src_utils_http, src_utils_utils, src_events_notifier, src_events_list);
src_sources_private_Private = function (initFolders, initFolder, initItems, initItem, initItemsTrash, initFoldersTrash, itemMapper, defaultSettings, utils, decorators, eventsList, initChannel) {
  return function (userSettings) {
    var settings = utils.extend({}, defaultSettings, userSettings), folders = initFolders(settings), folder = initFolder(settings), items = initItems(settings), item = initItem(settings), itemsTrash = initItemsTrash(settings), foldersTrash = initFoldersTrash(settings), channel = initChannel(settings, this, itemMapper);
    folders.trash = foldersTrash;
    items.trash = itemsTrash;
    this.name = 'private';
    this.folders = decorators.addEvents(this, eventsList.FOLDERS, folders);
    this.folder = decorators.addEvents(this, eventsList.FOLDER, folder);
    this.item = decorators.addEvents(this, eventsList.ITEM, item);
    this.items = decorators.addEvents(this, eventsList.ITEMS, items);
    this.channel = channel;
  };
}(src_sources_private_folders, src_sources_private_folder, src_sources_private_items, src_sources_private_item, src_sources_private_itemstrash, src_sources_private_folderstrash, src_sources_private_mappers_item, src_sources_private_settings, src_utils_utils, src_sources_decorators, src_events_list, src_services_channel_channel);
src_sources_picasa_settings = {
  apiUrl: '//pix.wix.com/services/google',
  foldersLimit: 500,
  itemsLimit: 50
};
src_sources_picasa_mappers_folder = function (data) {
  return {
    id: data.gphoto$id.$t,
    name: data.title.$t,
    mediaType: 'picture',
    parentId: null,
    filesCount: data.gphoto$numphotos.$t,
    createdAt: data.published.$t
  };
};
src_sources_picasa_parsers_folders = function (toFolder) {
  return function (data) {
    return { data: data.feed.entry.map(toFolder) };
  };
}(src_sources_picasa_mappers_folder);
src_sources_picasa_parsers_error = function (Promise) {
  return function (response) {
    return Promise.reject(response);
  };
}(bluebird);
src_sources_picasa_folders = function (http, toFolders, toError) {
  return function (settings) {
    function successHandler(response) {
      return toFolders(response.data);
    }
    function failHandler(reason) {
      return toError(reason);
    }
    function list(folderId, options) {
      options = options || {};
      options.paging = options.paging || {};
      var requestOptions = {
        thumbsize: '150c',
        'max-results': options.paging.pageSize || settings.foldersLimit,
        'start-index': options.paging.cursor || 1
      };
      return http.get(settings.apiUrl + '/albums', requestOptions, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(successHandler).catch(failHandler);
    }
    return { list: list };
  };
}(src_utils_http, src_sources_picasa_parsers_folders, src_sources_picasa_parsers_error);
src_sources_picasa_mappers_item = function (utils) {
  function getLastImage(mediaGroup) {
    var images = mediaGroup.media$thumbnail.filter(function (item) {
      return !item.medium || item.medium !== 'video';
    });
    return images[images.length - 1].url || '';
  }
  return function (data) {
    var lastImage, width, height, bigImage, preview;
    lastImage = getLastImage(data.media$group);
    width = +data.gphoto$width.$t || 1024;
    height = +data.gphoto$height.$t || 768;
    // hack. API does not provide really full images
    // w1024-h768-no is used by google at slideshows
    bigImage = lastImage.replace(/\/s[0-9]+/, '/w' + width + '-h' + height + '-no');
    // sizes: 128, 200, 220, 288, 320, 400, 512, 576, 640, 720, 800, 912, 1024, 1152, 1280, 1440, 1600
    if (width > 400) {
      preview = lastImage.replace(/\/s[0-9]+(-c)?/, '/s400');
    } else {
      preview = bigImage;
    }
    return {
      id: data.id.$t,
      name: data.summary.$t || data.title.$t,
      mediaType: 'picture',
      fileUrl: utils.normalizeUri(bigImage),
      thumbnailUrl: utils.normalizeUri(lastImage),
      previewUrl: utils.normalizeUri(preview),
      createdAt: data.published.$t,
      tags: [],
      width: width,
      height: height
    };
  };
}(src_utils_utils);
src_sources_picasa_parsers_items = function (toItem) {
  return function (data) {
    return {
      data: data.feed.entry.map(toItem),
      paging: {
        cursor: data.feed.openSearch$startIndex.$t + data.feed.openSearch$itemsPerPage.$t,
        pageSize: data.feed.openSearch$itemsPerPage.$t
      }
    };
  };
}(src_sources_picasa_mappers_item);
src_sources_picasa_items = function (http, toItems, toError) {
  return function (settings) {
    function successHandler(response) {
      return toItems(response.data);
    }
    function failHandler(reason) {
      return toError(reason);
    }
    function list(folderId, options) {
      options = options || {};
      options.paging = options.paging || {};
      var requestOptions = {
        album_id: folderId || null,
        kind: 'photo',
        thumbsize: '150c',
        'max-results': options.paging.pageSize || settings.itemsLimit,
        'start-index': options.paging.cursor || 1
      };
      return http.get(settings.apiUrl + '/photos', requestOptions, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(successHandler).catch(failHandler);
    }
    return { list: list };
  };
}(src_utils_http, src_sources_picasa_parsers_items, src_sources_picasa_parsers_error);
src_sources_picasa_Picasa = function (settings, initFolders, initItems, decorators, eventsList) {
  return function () {
    var folders = initFolders(settings), items = initItems(settings);
    this.folders = decorators.addEvents(this, eventsList.FOLDERS, folders);
    this.items = decorators.addEvents(this, eventsList.ITEMS, items);
    this.name = 'picasa';
  };
}(src_sources_picasa_settings, src_sources_picasa_folders, src_sources_picasa_items, src_sources_decorators, src_events_list);
src_sources_instagram_settings = {
  apiUrl: '//pix.wix.com/services/instagram',
  api2Url: '//pix.wix.com/services/instagram2'
};
src_sources_instagram_mappers_folder = function (data) {
  return {
    id: 'Instagram',
    name: 'Instagram',
    mediaType: 'picture',
    parentId: null,
    filesCount: data.counts.media,
    createdAt: null
  };
};
src_sources_instagram_parsers_folders = function (toFolder) {
  return function (data) {
    return { data: [toFolder(data)] };
  };
}(src_sources_instagram_mappers_folder);
src_sources_instagram_parsers_error = function (Promise) {
  return function (response) {
    if (response.code === 500) {
      response.code = 403;
      response.data = {
        message: 'Unauthorized',
        result: 'error'
      };
    }
    return Promise.reject(response);
  };
}(bluebird);
src_sources_instagram_folders = function (http, toFolders, toError) {
  return function (settings) {
    function successHandler(response) {
      return toFolders(response.data);
    }
    function failHandler(reason) {
      return toError(reason);
    }
    function list(folderId, options) {
      options = options || {};
      return http.get(settings.apiUrl + '/user', null, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(successHandler).catch(failHandler);
    }
    return { list: list };
  };
}(src_utils_http, src_sources_instagram_parsers_folders, src_sources_instagram_parsers_error);
src_sources_instagram_mappers_item = function (utils) {
  return function (data) {
    if (!data.caption) {
      data.caption = { text: '' };
    }
    return {
      id: data.id,
      name: data.caption.text,
      mediaType: 'picture',
      fileUrl: utils.normalizeUri(data.images.standard_resolution.url),
      thumbnailUrl: utils.normalizeUri(data.images.low_resolution.url),
      previewUrl: utils.normalizeUri(data.images.standard_resolution.url),
      createdAt: +data.created_time * 1000,
      tags: utils.splitTags(data.tags),
      width: data.images.standard_resolution.width,
      height: data.images.standard_resolution.height
    };
  };
}(src_utils_utils);
src_sources_instagram_parsers_items = function (toItem) {
  return function (data) {
    data.next = data.next || {};
    var cursor = data.next.max_id || null, pageSize = data.next.count || null;
    return {
      data: data.photos.map(toItem),
      paging: {
        cursor: cursor,
        pageSize: pageSize
      }
    };
  };
}(src_sources_instagram_mappers_item);
src_sources_instagram_items = function (http, toItems, toError) {
  return function (settings) {
    function successHandler(response) {
      return toItems(response.data);
    }
    function failHandler(reason) {
      return toError(reason);
    }
    function list(folderId, options) {
      options = options || {};
      options.paging = options.paging || {};
      var requestOptions = {
        count: options.paging.pageSize || 50,
        max_id: options.paging.cursor || null
      };
      return http.get(settings.api2Url + '/photos', requestOptions, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(successHandler).catch(failHandler);
    }
    return { list: list };
  };
}(src_utils_http, src_sources_instagram_parsers_items, src_sources_instagram_parsers_error);
src_sources_instagram_Instagram = function (settings, initFolders, initItems, decorators, eventsList) {
  return function () {
    var folders = initFolders(settings), items = initItems(settings);
    this.name = 'instagram';
    this.folders = decorators.addEvents(this, eventsList.FOLDERS, folders);
    this.items = decorators.addEvents(this, eventsList.ITEMS, items);
  };
}(src_sources_instagram_settings, src_sources_instagram_folders, src_sources_instagram_items, src_sources_decorators, src_events_list);
src_sources_facebook_settings = {
  apiUrl: '//pix.wix.com/services/facebook2',
  foldersLimit: 50,
  itemsLimit: 50
};
src_sources_facebook_mappers_folder = function (data) {
  return {
    id: data.id,
    name: data.name,
    mediaType: 'picture',
    parentId: null,
    filesCount: data.count,
    createdAt: data.created_time
  };
};
src_sources_facebook_parsers_folders = function (toFolder) {
  return function (data) {
    return { data: data.data.map(toFolder) };
  };
}(src_sources_facebook_mappers_folder);
src_sources_facebook_parsers_error = function (Promise) {
  return function (response) {
    if (response.code === 400 && response.data.code === 190) {
      response.code = 403;
    }
    return Promise.reject(response);
  };
}(bluebird);
src_sources_facebook_folders = function (http, toFolders, toError) {
  return function (settings) {
    function successHandler(response) {
      return toFolders(response.data);
    }
    function failHandler(reason) {
      return toError(reason);
    }
    function list(folderID, options) {
      options = options || {};
      options.paging = options.paging || {};
      var requestOptions = {
        limit: options.paging.pageSize || settings.foldersLimit,
        after: options.paging.cursor || null
      };
      return http.get(settings.apiUrl + '/albums', requestOptions, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(successHandler).catch(failHandler);
    }
    return { list: list };
  };
}(src_utils_http, src_sources_facebook_parsers_folders, src_sources_facebook_parsers_error);
src_sources_facebook_mappers_item = function (utils) {
  function findThumbnailUrl(images, minWidth, minHeight) {
    minHeight = minHeight || 190;
    minWidth = minWidth || 190;
    var bigImages, biggestImage, smallestImage;
    if (images.length === 1) {
      return images[0].source;
    }
    bigImages = images.filter(function (image) {
      return image.width > minWidth && image.height > minHeight;
    });
    smallestImage = utils.min(bigImages, function (image) {
      return image.width + image.height;
    });
    if (smallestImage) {
      return smallestImage.source;
    }
    biggestImage = utils.max(images, function (image) {
      return image.width + image.height;
    });
    return biggestImage.source;
  }
  return function (data) {
    return {
      id: data.id,
      folderId: null,
      name: data.name || '',
      mediaType: 'picture',
      fileUrl: utils.normalizeUri(data.source),
      thumbnailUrl: utils.normalizeUri(findThumbnailUrl(data.images)),
      previewUrl: utils.normalizeUri(data.source),
      createdAt: data.created_time,
      tags: [],
      width: data.width,
      height: data.height
    };
  };
}(src_utils_utils);
src_sources_facebook_parsers_items = function (toItem) {
  return function (data) {
    data.paging = data.paging || {};
    data.paging.cursors = data.paging.cursors || {};
    data.paging.cursors.after = data.paging.cursors.after || null;
    return {
      data: data.data.map(toItem),
      paging: {
        cursor: data.paging.cursors.after,
        pageSize: null
      }
    };
  };
}(src_sources_facebook_mappers_item);
src_sources_facebook_items = function (http, toItems, toError) {
  return function (settings) {
    function successHandler(response) {
      return toItems(response.data);
    }
    function failHandler(reason) {
      return toError(reason);
    }
    function list(folderId, options) {
      options = options || {};
      options.paging = options.paging || {};
      var requestOptions = {
        album_id: folderId,
        limit: options.paging.pageSize || settings.itemsLimit,
        after: options.paging.cursor || null
      };
      return http.get(settings.apiUrl + '/photos', requestOptions, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(successHandler).catch(failHandler);
    }
    return { list: list };
  };
}(src_utils_http, src_sources_facebook_parsers_items, src_sources_facebook_parsers_error);
src_sources_facebook_Facebook = function (settings, initFolders, initItems, decorators, eventsList) {
  return function () {
    var folders = initFolders(settings), items = initItems(settings);
    this.name = 'facebook';
    this.folders = decorators.addEvents(this, eventsList.FOLDERS, folders);
    this.items = decorators.addEvents(this, eventsList.ITEMS, items);
  };
}(src_sources_facebook_settings, src_sources_facebook_folders, src_sources_facebook_items, src_sources_decorators, src_events_list);
src_sources_flickr_settings = {
  apiUrl: '//pix.wix.com/services/flickr',
  foldersLimit: 50,
  itemsLimit: 50
};
src_sources_flickr_mappers_folder = function (data) {
  return {
    id: data.id,
    name: data.title._content,
    mediaType: 'picture',
    parentId: null,
    filesCount: +data.photos + +data.videos,
    createdAt: +data.date_create * 1000
  };
};
src_sources_flickr_parsers_folders = function (toFolder) {
  return function (data) {
    return { data: data.photosets.photoset.map(toFolder) };
  };
}(src_sources_flickr_mappers_folder);
src_sources_flickr_parsers_error = function (Promise) {
  return function (response) {
    return Promise.reject(response);
  };
}(bluebird);
src_sources_flickr_folders = function (http, toFolders, toError) {
  return function (settings) {
    function successHandler(response) {
      return toFolders(response.data);
    }
    function failHandler(reason) {
      return toError(reason);
    }
    function list(folderId, options) {
      options = options || {};
      options.paging = options.paging || {};
      var requestOptions = {
        primary_photo_extras: 'url_t,url_s,url_m,url_b,url_o',
        per_page: options.paging.pageSize || settings.foldersLimit,
        page: options.paging.cursor || null
      };
      return http.get(settings.apiUrl + '/albums', requestOptions, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(successHandler).catch(failHandler);
    }
    return { list: list };
  };
}(src_utils_http, src_sources_flickr_parsers_folders, src_sources_flickr_parsers_error);
src_sources_flickr_mappers_item = function (utils) {
  function toThumbnails(photo) {
    var thumbnail = photo.url_m || photo.url_s || photo.url_t, big = photo.url_b || thumbnail, original = photo.url_o || big;
    return {
      fileUrl: original,
      thumbnailUrl: thumbnail,
      previewUrl: big
    };
  }
  return function (data) {
    var thumbnails = toThumbnails(data);
    return {
      id: data.id,
      name: data.title,
      folderId: null,
      mediaType: 'picture',
      fileUrl: utils.normalizeUri(thumbnails.fileUrl),
      thumbnailUrl: utils.normalizeUri(thumbnails.thumbnailUrl),
      previewUrl: utils.normalizeUri(thumbnails.previewUrl),
      createdAt: null,
      tags: [],
      width: +(data.width_o || data.width_m || data.width_s || data.width_t),
      height: +(data.height_o || data.height_m || data.height_s || data.height_t)
    };
  };
}(src_utils_utils);
src_sources_flickr_parsers_items = function (toItem) {
  return function (data) {
    var cursor = data.photoset.page < data.photoset.pages ? data.photoset.page + 1 : null, pageSize = +data.photoset.perpage;
    return {
      data: data.photoset.photo.map(toItem),
      paging: {
        cursor: cursor,
        pageSize: pageSize
      }
    };
  };
}(src_sources_flickr_mappers_item);
src_sources_flickr_items = function (http, toItems, toError) {
  return function (settings) {
    function successHandler(response) {
      return toItems(response.data);
    }
    function failHandler(reason) {
      return toError(reason);
    }
    function list(folderId, options) {
      options = options || {};
      options.paging = options.paging || {};
      var requestOptions = {
        extras: 'url_t,url_s,url_m,url_b,url_o',
        set_id: folderId,
        per_page: options.paging.pageSize || settings.itemsLimit,
        page: options.paging.cursor || null
      };
      return http.get(settings.apiUrl + '/photoset', requestOptions, {
        withCredentials: true,
        headers: options.headers || {}
      }).then(successHandler).catch(failHandler);
    }
    return { list: list };
  };
}(src_utils_http, src_sources_flickr_parsers_items, src_sources_flickr_parsers_error);
src_sources_flickr_Flickr = function (settings, initFolders, initItems, decorators, eventsList) {
  return function () {
    var folders = initFolders(settings), items = initItems(settings);
    this.name = 'flickr';
    this.folders = decorators.addEvents(this, eventsList.FOLDERS, folders);
    this.items = decorators.addEvents(this, eventsList.ITEMS, items);
  };
}(src_sources_flickr_settings, src_sources_flickr_folders, src_sources_flickr_items, src_sources_decorators, src_events_list);
src_sources_list = function (Private, Picasa, Instagram, Facebook, Flickr) {
  /**
   * @summary The list of available source constructors
   * @enum
   * @memberof wixmp
   */
  var sources = {
    PRIVATE: Private,
    PICASA: Picasa,
    INSTAGRAM: Instagram,
    FACEBOOK: Facebook,
    FLICKR: Flickr
  };
  return sources;
}(src_sources_private_Private, src_sources_picasa_Picasa, src_sources_instagram_Instagram, src_sources_facebook_Facebook, src_sources_flickr_Flickr);
src_events_events = function (notifier, list, utils) {
  var events = utils.merge(list);
  function defineNonEnumerableProperty(name, value) {
    Object.defineProperty(events, name, {
      enumerable: false,
      value: value
    });
  }
  defineNonEnumerableProperty('on', notifier.addListener);
  defineNonEnumerableProperty('off', notifier.removeListener);
  return events;
}(src_events_notifier, src_events_list, src_utils_utils);
src_connector_connector_settings = {
  PICASA: {
    connectUrl: '//pix.wix.com/services/google/connect',
    disconnectUrl: '//pix.wix.com/services/google/disconnect',
    parameterName: 'goglact'
  },
  INSTAGRAM: {
    connectUrl: '//pix.wix.com/services/instagram/connect',
    disconnectUrl: '//pix.wix.com/services/instagram/disconnect',
    parameterName: 'instact'
  },
  FACEBOOK: {
    connectUrl: '//pix.wix.com/services/facebook/connect',
    disconnectUrl: '//pix.wix.com/services/facebook/disconnect',
    parameterName: 'fbact'
  },
  FLICKR: {
    connectUrl: '//pix.wix.com/services/flickr/connect',
    disconnectUrl: '//pix.wix.com/services/flickr/disconnect',
    parameterName: 'flact'
  }
};
src_connector_connector = function (Promise, connectorSettings, http, utils) {
  return function (adapterName, userSettings) {
    var settings = connectorSettings[adapterName];
    if (typeof settings !== 'object') {
      throw new Error('Invalid source');
    }
    function getParameterName() {
      return settings.parameterName;
    }
    function isConnected() {
      return !!localStorage.getItem(settings.parameterName);
    }
    function disconnect() {
      localStorage.removeItem(settings.parameterName);
      return http.get(settings.disconnectUrl, null, { withCredentials: true });
    }
    function connect() {
      var promise;
      window.open(settings.connectUrl + '?return_url=' + userSettings.redirectUrl, 'connector', 'width=950,height=550');
      promise = new Promise(function (resolve, reject) {
        window.connectService = function (data) {
          var token, status;
          token = utils.getParameterByName(data, getParameterName());
          status = utils.getParameterByName(data, 'status');
          if (token && (!status || status !== 'FAIL')) {
            resolve(token);
          } else {
            reject('Not Authorized');
          }
        };
      });
      promise.then(function (token) {
        localStorage.setItem(settings.parameterName, token);
      }, function (reason) {
        return reason;
      });
      return promise;
    }
    return {
      isConnected: isConnected,
      disconnect: disconnect,
      connect: connect
    };
  };
}(bluebird, src_connector_connector_settings, src_utils_http, src_utils_utils);
src_services_bi_events_ids = {
  severity: {
    info: 10,
    warning: 20,
    error: 30,
    fatal: 40
  },
  BIEventsIds: {
    'folder.create': '112',
    'folder.rename': '115',
    'folder.remove': '117',
    'item.remove': '118',
    responseTime: '125',
    searchItems: '126'
  },
  BIAdaptersIds: {
    private: '01',
    public: '02',
    facebook: '03',
    flickr: '04',
    instagram: '05',
    picasa: '06',
    flickrSearch: '07',
    googleSearch: '08'
  },
  BIAdaptersRequestsIds: {
    'folders.list': '01',
    'folder.create': '02',
    'folder.rename': '03',
    'folder.remove': '04',
    'items.list': '11',
    'item.upload': '12',
    'item.uploadByUrl': '13',
    'item.update': '14',
    'item.remove': '15',
    moveItem: '16',
    'items.search': '17',
    getMoreSearchedItems: '17',
    getItemsByTag: '18',
    transcodeItem: '19'
  }
};
src_services_bi_request = function (BIEventIds, utils) {
  function send(url, data) {
    var biImage = document.createElement('img');
    biImage.setAttribute('src', url + '?' + utils.encodeParams(data));
    biImage = null;
  }
  function getCurrentTime() {
    return new Date().getTime();
  }
  function getBaseHost() {
    //return '//frog.wixpress.com';
    return /\.wixpress\.com/i.test(document.location.host) || /local\./i.test(document.location.host) ? '//frog.wixpress.com' : '//frog.wix.com';
  }
  function benchmark(data) {
    return send(getBaseHost() + '/mg', {
      evid: BIEventIds.BIEventsIds.responseTime,
      call_name: data.requestName || '',
      ts: data.responseTime || 0,
      result: data.isSuccess ? 'success' : 'fail',
      response_speed: Math.floor(data.responseSize || 0 / (data.responseTime / 1000)),
      response_size: data.responseSize
    });
  }
  function notifyResponseTime(adapter, eventName, data) {
    var requestName = adapter.name + '(' + eventName + ')';
    var responseTime = getCurrentTime() - data.startedAt;
    //console.log('BI: [',requestName, '] ',responseTime, ' ms');
    benchmark({
      requestName: requestName,
      responseTime: responseTime,
      isSuccess: data.isSuccess,
      responseSize: data.responseSize
    });
  }
  function benchmarkRequest(promise, params) {
    var startedAt = getCurrentTime();
    promise.then(function () {
      notifyResponseTime(params.eventTarget, params.eventName, {
        startedAt: startedAt,
        responseSize: 0,
        isSuccess: true
      });
    }).catch(function () {
      notifyResponseTime(params.eventTarget, params.eventName, {
        startedAt: startedAt,
        responseSize: 0,
        isSuccess: false
      });
    });
  }
  function report(eventId, data) {
    data.evid = eventId;
    //data = _.extend({
    //  evid: eventId
    //}, data);
    return send(getBaseHost() + '/mg', data);
  }
  function error(adapterName, eventName, response) {
    var httpCode = response.code || '000', adapterCode = BIEventIds.BIAdaptersIds[adapterName] || '00', requestCode = BIEventIds.BIAdaptersRequestsIds[eventName] || '00', errorDesc = adapterName + ' ' + eventName + ': ' + response.message, errorCode = adapterCode + requestCode + httpCode;
    return send(getBaseHost() + '/trg', {
      src: 25,
      evid: 10,
      // 10 (Error), 20 (Load time)
      iss: 1,
      // issue (sub-category)
      sev: BIEventIds.severity.error,
      errc: errorCode || '0000000',
      ver: 'MEDIA_GALLERY_VERSION',
      site_id: '',
      // ex-did param
      httpc: httpCode || '000',
      dsc: errorDesc || ''
    });
  }
  return {
    report: report,
    error: error,
    benchmark: benchmarkRequest
  };
}(src_services_bi_events_ids, src_utils_utils);
src_services_bi_bi = function (notifier, eventsList, sendRequest) {
  return function (state) {
    var biListener = function (promise, params) {
      // params.eventTarget
      // params.eventName
      // if called by emitWithArrayOfPromises
      if (Array.isArray(promise)) {
        promise = Promise.all(promise);
      }
      sendRequest.benchmark(promise, params);
      var sendError = function (adapter, eventName, response) {
        sendRequest.error(adapter.name, eventName, response);
      };
      var reportSuccess = function () {
      };
      var reportError = function (response) {
        sendError(params.eventTarget, params.eventName, response);
      };
      return promise.then(reportSuccess, reportError);
    };
    Object.keys(eventsList).forEach(function (group) {
      Object.keys(eventsList[group]).forEach(function (action) {
        if (state === true) {
          notifier.addListener(eventsList[group][action], biListener);
        } else {
          notifier.removeListener(eventsList[group][action], biListener);
        }
      });
    });
  };
}(src_events_notifier, src_events_list, src_services_bi_request);
src_services_upload_file_to_upload = function (Promise) {
  function canAbort(fileToUpload) {
    return fileToUpload.status === 'waiting' || fileToUpload.status === 'uploading';
  }
  function abortEarly(fileToUpload) {
    fileToUpload.status = 'failed';
    fileToUpload.deferred.promise.catch(function (reason) {
      fileToUpload.error = reason;
    });
    fileToUpload.deferred.promise.abort();
  }
  function initUpload(fileToUpload, data) {
    fileToUpload.status = 'uploading';
    fileToUpload.uploadPromise = data.uploadFn(fileToUpload.source).progress(function (progress) {
      fileToUpload.deferred.promise.notify(progress);
    }).then(function (res) {
      fileToUpload.deferred.resolve(res);
    }).catch(function (reason) {
      fileToUpload.error = reason;
      fileToUpload.deferred.reject(reason);
    });
  }
  function createDeferred() {
    var deferred = Promise.defer();
    deferred.promise.catch(function (reason) {
      console.log(reason);
    });
    deferred.promise.cancellable();
    return deferred;
  }
  function map(data) {
    return {
      source: data.source,
      status: 'waiting',
      bytesLoaded: 0,
      deferred: createDeferred(),
      isAborted: false,
      error: {},
      upload: function () {
        if (!this.isAborted) {
          initUpload(this, data);
        }
        return this.deferred.promise;
      },
      abort: function () {
        if (!canAbort(this)) {
          return;
        }
        this.isAborted = true;
        if (this.status === 'waiting') {
          abortEarly(this);
          return;
        }
        this.status = 'failed';
        this.uploadPromise.abort();
      },
      canRetry: function () {
        if (!this.error.code) {
          return false;
        }
        var codesToRetry = [
          -100,
          -201,
          401,
          403,
          408
        ];
        if (this.status === 'failed' && codesToRetry.indexOf(this.error.code) !== -1) {
          return true;
        }
        return false;
      },
      signUpForRetry: function () {
        this.status = 'waiting';
        this.isAborted = false;
        this.error = {};
        this.deferred = createDeferred();
      },
      canAbort: function () {
        return canAbort(this);
      }
    };
  }
  return map;
}(bluebird);
src_services_upload_upload_collection = function (Promise, fileToUploadMapper) {
  var uploadQueue = [];
  var uploadIsInProgress = false;
  var uploadQueueDeferred = Promise.defer();
  var currentUploadingItemIdx = 0;
  var currentUploadedTotal = 0;
  var supportedEvents = [
    'queueChanged',
    'fileStatusChanged',
    'uploadQueueStarted',
    'uploadQueueFinished'
  ];
  var events = [];
  function filterEvents(eventName) {
    return function (event) {
      return event.name === eventName;
    };
  }
  function on(eventNames, callback) {
    if (typeof eventNames === 'string') {
      eventNames = [eventNames];
    }
    eventNames.forEach(function (eventName) {
      if (supportedEvents.indexOf(eventName)) {
        events.push({
          name: eventName,
          fn: callback
        });
      } else {
        throw new Error('This event' + eventName + 'is not supported by multiple file uploader');
      }
    });
  }
  function emit(eventName, args) {
    var __slice = [].slice;
    args = arguments.length >= 2 ? __slice.call(arguments, 1) : [];
    events.filter(filterEvents(eventName)).forEach(function (event) {
      event.fn.apply({ event: eventName }, args);
    });
  }
  function hasFilesToRetry() {
    return uploadQueue.filter(function (fileToUpload) {
      return fileToUpload.status === 'waiting';
    }).length !== 0;
  }
  function hasRetryableFiles() {
    return uploadQueue.some(function (fileToUpload) {
      return fileToUpload.canRetry();
    });
  }
  //TODO refactor dynamicPromiseReduce function
  function dynamicPromiseReduce(itemsToUpload, callback) {
    var currentItem = itemsToUpload[currentUploadingItemIdx];
    if (currentItem && currentItem.status !== 'waiting') {
      currentUploadingItemIdx++;
      dynamicPromiseReduce(itemsToUpload, callback);
      return uploadQueueDeferred.promise;
    }
    if (!currentItem && !hasFilesToRetry()) {
      uploadIsInProgress = false;
      currentUploadingItemIdx = 0;
      uploadQueueDeferred.resolve();
      return uploadQueueDeferred.promise;
    } else if (!currentItem && hasFilesToRetry()) {
      currentUploadingItemIdx = 0;
      dynamicPromiseReduce(itemsToUpload, callback);
      return uploadQueueDeferred.promise;
    }
    callback(currentItem).finally(function () {
      currentUploadingItemIdx++;
      dynamicPromiseReduce(itemsToUpload, callback);
    });
    return uploadQueueDeferred.promise;
  }
  function getFileSize(fileToUpload) {
    return fileToUpload.source.file ? fileToUpload.source.file.size : 1;
  }
  function getBytesTotal() {
    return uploadQueue.reduce(function (sum, fileToUpload) {
      return sum + getFileSize(fileToUpload);
    }, 0);
  }
  function calculateItemBytesLoaded(fileToUpload, progress) {
    switch (progress.status) {
    case 'uploading':
      if (progress.loaded <= getFileSize(fileToUpload)) {
        return progress.loaded;
      }
      return getFileSize(fileToUpload);
    case 'succeeded':
    case 'processing':
      return getFileSize(fileToUpload);
    case 'failed':
      return 0;
    default:
      return 0;
    }
  }
  function processItemProgress(item) {
    return function (progress) {
      item.status = progress.status;
      item.bytesLoaded = progress.loaded;
      progress.file = item;
      emit('fileStatusChanged', {
        bytesUploaded: currentUploadedTotal + calculateItemBytesLoaded(item, progress),
        bytesTotal: getBytesTotal(),
        currentFileProgress: progress,
        currentFileQueueIdx: currentUploadingItemIdx
      });
    };
  }
  function uploadCurrentFile(fileToUpload) {
    return fileToUpload.upload();
  }
  function signupUploadPromise(fileToUpload) {
    var processCurrentItemProgress = processItemProgress(fileToUpload);
    fileToUpload.deferred.promise.progress(processCurrentItemProgress).then(function (result) {
      fileToUpload.serverResponse = result;
      processCurrentItemProgress({
        status: 'succeeded',
        total: getFileSize(fileToUpload),
        loaded: getFileSize(fileToUpload)
      });
      currentUploadedTotal += getFileSize(fileToUpload);
    }).catch(function (reason) {
      fileToUpload.serverResponse = reason;
      processCurrentItemProgress({
        status: 'failed',
        total: getFileSize(fileToUpload),
        loaded: 0
      });
    });
  }
  function startUploadQueue() {
    emit('uploadQueueStarted', uploadQueue);
    dynamicPromiseReduce(uploadQueue, uploadCurrentFile).finally(function () {
      emit('uploadQueueFinished', uploadQueue);
    });
  }
  function clearQueue() {
    if (uploadIsInProgress) {
      throw new Error('Upload queue can not be cleared while upload is running');
    }
    uploadQueue.length = 0;
    currentUploadedTotal = 0;
  }
  function upload(fileSources) {
    fileSources = fileSources || [];
    if (!uploadIsInProgress && !hasRetryableFiles()) {
      clearQueue();
      uploadQueueDeferred = Promise.defer();
    }
    var mappedFiles = fileSources.map(fileToUploadMapper);
    mappedFiles.forEach(function (fileToUpload) {
      signupUploadPromise(fileToUpload);
      var nativeRetry = fileToUpload.signUpForRetry;
      fileToUpload.signUpForRetry = function () {
        nativeRetry.apply(this, arguments);
        signupUploadPromise(fileToUpload);
        if (!uploadIsInProgress) {
          uploadIsInProgress = true;
          startUploadQueue();
        }
      };
      uploadQueue.push(fileToUpload);
    });
    emit('queueChange', uploadQueue);
    if (!uploadIsInProgress) {
      uploadIsInProgress = true;
      startUploadQueue();
    }
    return mappedFiles;
  }
  return {
    on: on,
    upload: upload,
    clearQueue: clearQueue
  };
}(bluebird, src_services_upload_file_to_upload);
src_wixmp = function (Source, sources, events, externalSourceConnector, enableBI, Uploader) {
  /**
   * @namespace wixmp
   */
  return {
    Source: Source,
    sources: sources,
    events: events,
    bi: enableBI,
    connectExternalSource: externalSourceConnector,
    Uploader: Uploader
  };
}(src_sources_Source, src_sources_list, src_events_events, src_connector_connector, src_services_bi_bi, src_services_upload_upload_collection);
window.wixmp = src_wixmp;
}());