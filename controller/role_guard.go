/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

package controller

import (
	"net/http"

	"github.com/QuantumNous/new-api/common"

	"github.com/gin-gonic/gin"
)

// requireRoot 是写操作的二次防御：路由层中间件理应已是 RootAuth，
// 此函数在 handler 入口再次校验 role >= RoleRootUser，
// 防止后续误改路由分组（AdminAuth/UserAuth）导致普通管理员能触达。
// 返回 false 表示已写入响应并中断，调用方应直接 return。
func requireRoot(c *gin.Context) bool {
	if c.GetInt("role") < common.RoleRootUser {
		c.JSON(http.StatusForbidden, gin.H{
			"success": false,
			"message": "权限不足",
		})
		c.Abort()
		return false
	}
	return true
}
