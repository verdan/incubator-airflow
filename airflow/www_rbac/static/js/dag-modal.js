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

const initModalButtons = (dagID, execDate) => {
  $("#btn_dagrun_clear").click(function () {
    window.location = $(this).data('url') +
      "&dag_id=" + encodeURIComponent(dagID) +
      "&execution_date=" + encodeURIComponent(execDate) +
      "&origin=" + encodeURIComponent(window.location);
  });


  $('#btn_dagrun_failed').click(function () {
    window.location = $(this).data('url') +
      "?dag_id=" + encodeURIComponent(dagID) +
      "&execution_date=" + encodeURIComponent(execDate) +
      "&origin=" + encodeURIComponent(window.location);
  });


  $('#btn_dagrun_success').click(function () {
    window.location = $(this).data('url') +
      "?dag_id=" + encodeURIComponent(dagID) +
      "&execution_date=" + encodeURIComponent(execDate) +
      "&origin=" + encodeURIComponent(window.location);
  });


  $('#btn_edit_dagrun').click(function () {
    window.location = $(this).data('url') + dagID;
  });
};


export const callDagModal = (dag) => {
  const dagID = dag && dag.dag_id;
  const execDate = dag && dag.execution_date;
  $('#dag_id').html(dagID);
  $('#dagModal').modal({});
  $("#dagModal").css("margin-top", "0px");

  initModalButtons(dagID, execDate)
};

