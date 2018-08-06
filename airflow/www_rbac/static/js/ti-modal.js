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

let taskID = '';
let execDate = '';
let subDagID = '';
let dagID = $('#dag-id').data('dag-id');

const updateQueryStringParameter = (ti) => {
  const uri = String(window.location);
  const re = new RegExp("([?&])root=.*?(&|$)", "i");
  const separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + "root=" + ti + '$2');
  }
  else {
    return uri + separator + "root=" + ti;
  }
};

export const callTaskInstanceModal = (ti, d, sd) => {
  $("#btn_filter").on("click", function () {
    window.location = updateQueryStringParameter(ti);
  });
  $('#task_id').html(ti);
  $('#execution_date').html(d);
  $('#myModal').modal({});
  $("#myModal").css("margin-top", "0px");
  if (sd === undefined)
    $("#div_btn_subdag").hide();
  else {
    $("#div_btn_subdag").show();
    subDagID = encodeURIComponent(`${dagID}.${ti}`);
  }
  dagID = encodeURIComponent(dagID);
  taskID = encodeURIComponent(ti);
  execDate = encodeURIComponent(d);
};

$("#btn_rendered").click(function () {
  window.location = $(this).data('url') +
    "?task_id=" + taskID +
    "&dag_id=" + dagID +
    "&execution_date=" + execDate;
});

// Done
$("#btn_subdag").click(function () {
  window.location = $(this).data('url') +
    "?dag_id=" + subDagID +
    "&execution_date=" + execDate;
});

// Done
$("#btn_log").click(function () {
  window.location = $(this).data('url') +
    "?task_id=" + taskID +
    "&dag_id=" + dagID +
    "&execution_date=" + execDate;
});

// Done
$("#btn_task").click(function () {
  window.location = $(this).data('url') +
    "?task_id=" + taskID +
    "&dag_id=" + dagID +
    "&execution_date=" + execDate;
});

// Done
$("#btn_ti").click(function () {
  window.location = $(this).data('url') +
    "?flt1_dag_id_equals=" + dagID +
    "&_flt_3_task_id=" + taskID +
    "&_oc_TaskInstanceModelView=" + execDate;
});

// Done
$("#btn_run").click(function () {
  window.location = $(this).data('url') +
    "?task_id=" + taskID +
    "&dag_id=" + dagID +
    "&ignore_all_deps=" + $('#btn_ignore_all_deps').hasClass('active') +
    "&ignore_task_deps=" + $('#btn_ignore_task_deps').hasClass('active') +
    "&ignore_ti_state=" + $('#btn_ignore_ti_state').hasClass('active') +
    "&execution_date=" + execDate +
    "&origin=" + encodeURIComponent(window.location);
});

// Done
$("#btn_clear").click(function () {
  window.location = $(this).data('url') +
    "?task_id=" + taskID +
    "&dag_id=" + dagID +
    "&future=" + $('#btn_future').hasClass('active') +
    "&past=" + $('#btn_past').hasClass('active') +
    "&upstream=" + $('#btn_upstream').hasClass('active') +
    "&downstream=" + $('#btn_downstream').hasClass('active') +
    "&recursive=" + $('#btn_recursive').hasClass('active') +
    "&execution_date=" + execDate +
    "&origin=" + encodeURIComponent(window.location);
});

// Done
$("#btn_failed").click(function () {
  window.location = $(this).data('url') +
    "?task_id=" + taskID +
    "&dag_id=" + dagID +
    "&upstream=" + $('#btn_failed_upstream').hasClass('active') +
    "&downstream=" + $('#btn_failed_downstream').hasClass('active') +
    "&future=" + $('#btn_failed_future').hasClass('active') +
    "&past=" + $('#btn_failed_past').hasClass('active') +
    "&execution_date=" + execDate +
    "&origin=" + encodeURIComponent(window.location);
});

// Done
$("#btn_success").click(function () {
  window.location = $(this).data('url') +
    "?task_id=" + taskID +
    "&dag_id=" + dagID +
    "&upstream=" + $('#btn_success_upstream').hasClass('active') +
    "&downstream=" + $('#btn_success_downstream').hasClass('active') +
    "&future=" + $('#btn_success_future').hasClass('active') +
    "&past=" + $('#btn_success_past').hasClass('active') +
    "&execution_date=" + execDate +
    "&origin=" + encodeURIComponent(window.location);
});
