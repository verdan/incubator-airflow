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

require('bootstrap-toggle');

const highlightPills = (pathName) => {
  $(`a[href*="${pathName}"]`).parent().addClass('active');
  $('.never_active').removeClass('active');
};

const confirmDeleteDag = (dagID) => {
  $("#btn_delete_dag").click(function () {
    return confirm(`
    Are you sure you want to delete '${dagID}' now?
    This option will delete ALL metadata, DAG runs, etc.
    This cannot be undone.`);
  });
};


const initPauseResume = (dagID) => {
  $("#pause_resume").change(function () {
    const isPaused = $(this).prop('checked') ? 'true' : 'false';
    $.post($(this).data('url') + '?is_paused=' + isPaused + '&dag_id=' + encodeURIComponent(dagID));
  });
};


$(document).ready(function () {
  const dagID = $('#dag-id').data('dag-id');

  // Highlight active pill
  highlightPills(this.location.pathname);

  confirmDeleteDag(dagID);

  initPauseResume(dagID)

});
