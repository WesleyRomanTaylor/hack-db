{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "hackdb.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "hackdb.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "hackdb.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}


{{- define "portProtocol" -}}
  {{- $name := .name -}}
  {{- range $port := .ports -}}
    {{- if eq $port.name $name -}}
      {{- $port.protocol -}}
    {{- end -}}
  {{- end -}}
{{- end -}}

{{- define "portTargetPort" -}}
  {{- $name := .name -}}
  {{- range $port := .ports -}}
    {{- if eq $port.name $name -}}
      {{- $port.targetPort -}}
    {{- end -}}
  {{- end -}}
{{- end -}}

{{- define "portPort" -}}
  {{- $name := .name -}}
  {{- range $port := .ports -}}
    {{- if eq $port.name $name -}}
      {{- $port.port -}}
    {{- end -}}
  {{- end -}}
{{- end -}}



{{- define "imageVersion" -}}
  {{- $containerName := .containerName -}}
  {{- range $container := .containers -}}
    {{- if eq $container.container_name $containerName -}}
      {{- $container.image_tag -}}
    {{- end -}}
  {{- end -}}
{{- end -}}

{{- define "imageSpec" -}}
  {{- $containerName := .containerName -}}
  {{- range $container := .containers -}}
    {{- if eq $container.container_name $containerName -}}
      {{- printf "%s:%s"  $container.image_repo  $container.image_tag -}}
    {{- end -}}
  {{- end -}}
{{- end -}}

{{- define "imagePull" -}}
  {{- $containerName := .containerName -}}
  {{- range $container := .containers -}}
    {{- if eq $container.container_name $containerName -}}
      {{- $container.image_pull_policy -}}
    {{- end -}}
  {{- end -}}
{{- end -}}

{{- define "rdsDbHost" -}}
  {{- $rdsName := .rdsName -}}
  {{- range $rds := .aws_rds_instances -}}
    {{- if eq $rds.name $rdsName -}}
      {{- $rds.database_host -}}
    {{- end -}}
  {{- end -}}
{{- end -}}

{{- define "rdsDbName" -}}
  {{- $rdsName := .rdsName -}}
  {{- range $rds := .aws_rds_instances -}}
    {{- if eq $rds.name $rdsName -}}
      {{- $rds.database_name -}}
    {{- end -}}
  {{- end -}}
{{- end -}}

{{- define "rdsDbUser" -}}
  {{- $rdsName := .rdsName -}}
  {{- range $rds := .aws_rds_instances -}}
    {{- if eq $rds.name $rdsName -}}
      {{- $rds.database_user -}}
    {{- end -}}
  {{- end -}}
{{- end -}}
