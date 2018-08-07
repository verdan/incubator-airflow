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

import {converAndFormatUTC, generateTooltipDateTime} from './datetime-utils';
import {callTaskInstanceModal} from './ti-modal';
import {callDagModal} from './dag-modal';

var square_x = 500;
var square_size = 10;
var square_spacing = 2;

const setTooltip = () => {
  $("rect.state").tooltip({
    html: true,
    container: "body",
  });
  $("circle.task").tooltip({
    html: true,
    container: "body",
  });
};

const updateTaskInstanceStates = (nodeEnter, nodeobj) => {
  nodeEnter.append('g')
    .attr("class", "stateboxes")
    .attr("transform",
      function (d, i) {
        return "translate(" + (square_x - d.y) + ",0)";
      })
    .selectAll("rect").data(function (d) {
    return d.instances;
  })
    .enter()
    .append('rect')
    .on("click", function (d) {
      if (d.task_id === undefined)
        callDagModal(d);
      else if (nodeobj[d.task_id].operator == 'SubDagOperator')
        callTaskInstanceModal(d.dag_id, d.task_id, d.execution_date, true);
      else
        callTaskInstanceModal(d.dag_id, d.task_id, d.execution_date);
    })
    .attr("class", d => "state " + d.state)
    .attr("rx", d => (d.run_id != undefined) ? "5" : "0")
    .attr("ry", d => (d.run_id != undefined) ? "5" : "0")
    .style("shape-rendering", d => (d.run_id != undefined) ? "auto" : "crispEdges")
    .style("stroke-width", d => (d.run_id != undefined) ? "2" : "1")
    .style("stroke-opacity", d => d.external_trigger ? "0" : "1")
    .attr("data-toggle", "tooltip")
    .attr("data-original-title", d => {
      let tt = "Task ID: " + d.task_id + "<br>";
      tt += "Run: " + converAndFormatUTC(d.execution_date) + "<br>";
      if (d.run_id != undefined) {
        tt += "Run ID: <nobr>" + d.run_id + "</nobr><br>";
      }
      tt += "Operator: " + d.operator + "<br>";
      if (d.start_date != undefined) {
        tt += "Duration: " + d.duration + "<br>";
        tt += "State: " + d.state + "<br>";
        tt += generateTooltipDateTime(d.start_date, d.end_date, dagTZ); // dagTZ has been defined in dag.html
      }
      return tt;
    })
    .attr('x', (d, i) => i * (square_size + square_spacing))
    .attr('y', -square_size / 2)
    .attr('width', 10)
    .attr('height', 10)
    .on('mouseover', function (d, i) {
      d3.select(this).transition()
        .style('stroke-width', 3)
    })
    .on('mouseout', function (d, i) {
      d3.select(this).transition()
        .style("stroke-width", function (d) {
          return (d.run_id != undefined) ? "2" : "1"
        })
    });
};

updateTaskInstanceStates(nodeEnter, nodeobj);
setTooltip();
