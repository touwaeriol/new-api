/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
/**
 * Hook for checking "global / cross-user view" privileges.
 * 业主策略：仅 SUPER_ADMIN 才能查看其它用户的日志/账单/任务等全局视图。
 * 普通 admin（role=10）只能管理渠道，对个人视图与普通用户一致。
 */
import { useAuthStore } from '@/stores/auth-store'
import { ROLE } from '@/lib/roles'

/**
 * Check if current user can see global cross-user views (logs/billing/tasks).
 * Note: 名为 useIsAdmin 是历史遗留语义，实际语义已收紧到 SUPER_ADMIN。
 */
export function useIsAdmin(): boolean {
  const { user } = useAuthStore((state) => state.auth)
  return (user?.role ?? 0) >= ROLE.SUPER_ADMIN
}
