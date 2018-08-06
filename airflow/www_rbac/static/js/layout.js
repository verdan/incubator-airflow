/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {defaultFormatWithTZ} from './datetime-utils';
const moment = require('moment-timezone');

const displayTime = () => {
  let utcTime = moment().utc().format(defaultFormatWithTZ);
  $('#clock')
    .attr("data-original-title", function () {
      return $('#hostname').data('hostname');
    })
    .html(utcTime);

  setTimeout(displayTime, 1000);
};


const ajaxSetup = () => {
  $.ajaxSetup({
    beforeSend: function (xhr, settings) {
      if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken", $('#csrf').data('csrf-token'));
      }
    }
  });
};

$(document).ready(function () {
  // Live Clock in top navbar
  displayTime();

  // Set CSRF token for ajax calls
  ajaxSetup();

  // Initiate Tooltip for whole application
  $('span').tooltip();
});
