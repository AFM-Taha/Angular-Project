import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './administrator.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WalletBalanceComponent } from './wallet-balance/wallet-balance.component';
import { CurrencyListComponent } from './currency/currency-list/currency-list.component';
import { CurrencyFormComponent } from './currency/currency-form/currency-form.component';
import { StakingListComponent } from './staking/staking-list/staking-list.component';
import { StakingFormComponent } from './staking/staking-form/staking-form.component';
import { StakingHistoryListComponent } from './staking-history/staking-history-list/staking-history-list.component';
import { StakingHistoryViewComponent } from './staking-history/staking-history-view/staking-history-view.component';
import { SubAdminListComponent } from './sub-admin/sub-admin-list/sub-admin-list.component';
import { SubAdminFormComponent } from './sub-admin/sub-admin-form/sub-admin-form.component';
import { PairsListComponent } from './pairs/pairs-list/pairs-list.component';
import { UsersListComponent } from './users/users-list/users-list.component';
// import { FuturesSubacc } from './futures-subacc/futures-subacc.component';
import { UsersViewComponent } from './users/users-view/users-view.component';
import { TransactionsListComponent } from './transactions/transactions-list/transactions-list.component';
import { TransactionsViewComponent } from './transactions/transactions-view/transactions-view.component';
import { TradeHistoryComponent } from './trade-history/trade-history.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { SiteSettingFormComponent } from './site-settings/site-setting-form/site-setting-form.component';
import { AdminBankFormComponent } from './admin-bank/admin-bank-form/admin-bank-form.component';
import { MyProfileFormComponent } from './my-profile/my-profile-form/my-profile-form.component';
import { DocsComponent } from './api-docs/docs/docs.component';
import { DocsFormComponent } from './api-docs/docs-form/docs-form.component';
import { NewsLetterComponent } from './news-letter/news-letter.component';
import { AdminactivityComponent } from './admin-activity/admin-activity.component';
import { StakingReferralComponent } from './stakingReferralCommission/staking-referral.component';
import { UsersViewkycComponent } from './userAutoKyc/users-view/users-viewkyc.component';
import { UsersListkycComponent } from './userAutoKyc/users-list/users-listkyc.component';
import { PushnotificationComponent } from './push-notification/push-notification.component';
import { stakeenableduserComponent } from './stake-enabled-user/stake-enabled-user.component';
import { P2PTransactionHistoryListComponent } from './p2p-transaction-history/p2p-transaction-history-list/p2p-transaction-history-list.component';
import { P2PTransactionHistoryViewComponent } from './p2p-transaction-history/p2p-transaction-history-view/p2p-transaction-history-view.component';
import { P2PAppealHistoryListComponent } from './p2p-appeal-history/p2p-appeal-history-list/p2p-appeal-history-list.component';
import { P2PAppealHistoryViewComponent } from './p2p-appeal-history/p2p-appeal-history-view/p2p-appeal-history-view.component';
import { userTradeTdsComponent } from './user-TradeTds/user-TradeTds.component';
import { P2PSettingFormComponent } from './p2p-settings/p2p-setting-form/p2p-setting-form.component';
import { P2PReportListComponent } from './p2p-report/p2p-report-list/p2p-report-list.component';
import { P2PReportViewComponent } from './p2p-report/p2p-report-view/p2p-report-view.component';
import { P2PBlockedUsersListComponent } from './p2p-blocked-users/p2p-blocked-users-list/p2p-blocked-users-list.component';
import { P2PFeedBackListComponent } from './p2p-feedback/p2p-feedback-list/p2p-feedback-list.component';
import { P2PFeedBackViewComponent } from './p2p-feedback/p2p-feed-view/p2p-feed-view.component';
import { P2PPairsListComponent } from './p2p-pairs/p2p-pairs-list/p2p-pairs-list.component';
import { P2POrderListComponent } from './p2p-orders/p2p-orders-list/p2p-orders-list.component';
import { P2POrdersViewComponent } from './p2p-orders/p2p-orders-view/p2p-orders-view.component';
import { CMSListComponent } from './cms/cms-list/cms-list.component';
import { EmailTemplateListComponent } from './email-template/email-template-list/email-template-list.component';
import { FAQListComponent } from './faq/faq-list/faq-list.component';
import { DerivativesPairsListComponent } from './derivatives-pairs/derivatives-list/derivatives-list.component';
import { userBalanceSetComponent } from './user-Balance-Set/user-Balance-Set.component';
import { UserBalanceSetViewComponent } from './user-Balance-Set-View/admin-activity/user-Balance-Set-View.component';
import { BuyorderListComponent } from './buyorder/buyorder-list/buyorder-list.component';
import { BuyorderViewComponent } from './buyorder/buyorder-view/buyorder-view.component';
import { FuturesSubaccListComponent } from './futures-subacc/futures-subacc-list/futures-subacc-list.component';
import { FuturesSubaccViewComponent } from './futures-subacc/futures-subacc-view/futures-subacc-view.component';
import { FuturesUsdtMoveViewComponent } from './futures-usdt-move/futures-usdt-move-view/futures-usdt-move-view.component';
const routes: Routes = [
  {
    path: '',
    component: AdministratorComponent,
    canActivate: [],
    canActivateChild: [],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'wallet-balance',
        component: WalletBalanceComponent,
      },
      {
        path: 'sub-admin-list',
        component: SubAdminListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Sub Admin List',
          breadcrumb: 'Sub Admin List',
        }
      },
      {
        path: 'sub-admin-edit/:_id',
        component: SubAdminFormComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Sub Admin List',
          breadcrumb: 'Sub Admin List',
        }
      },
      {
        path: 'currency-list',
        component: CurrencyListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Currency List',
          breadcrumb: 'Currency List',
        }
      },
      {
        path: 'currency-edit/:_id',
        component: CurrencyFormComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Currency List',
          breadcrumb: 'Currency List',
        }
      },
      {
        path: 'cms-list',
        component: CMSListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Cms List',
          breadcrumb: 'Cms List',
        }
      },
      {
        path: 'derivatives-pairs-list',
        component: DerivativesPairsListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'derivatives List',
          breadcrumb: 'Derivatives Pairs List',
        }
      },
      {
        path: 'email-template',
        component: EmailTemplateListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Email Template',
          breadcrumb: 'Email Template',
        }
      },
      //stakingReferralComponent
      {
        path: 'staking-list',
        component: StakingListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Staking List',
          breadcrumb: 'Staking List',
        }
      },
      {
        path: 'Referral',
        component: StakingReferralComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'stakingReferral List',
          breadcrumb: 'stakingReferral List',
        }
      },
      {
        path: 'staking-edit/:_id',
        component: StakingFormComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Staking List',
          breadcrumb: 'Staking List',
        }
      },
      {
        path: 'pairs-list',
        component: PairsListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Pairs List',
          breadcrumb: 'Pairs List',
        }
      },
      {
        path: 'p2p-pairs-list',
        component: P2PPairsListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'P2P Pairs List',
          breadcrumb: 'P2P Pairs List',
        }
      },
      {
        path: 'users-list',
        component: UsersListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Users List',
          breadcrumb: 'Users List',
        }
      },
      {
        path: 'user-details/:_id',
        component: UsersViewComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Users View',
          breadcrumb: 'Users View',
        }
      },
      {
        path: 'users-listkyc',
        component: UsersListkycComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Users Listkyc',
          breadcrumb: 'Users Listkyc',
        }
      },
      {
        path: 'user-detailskyc/:_id',
        component: UsersViewkycComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Users Viewkyc',
          breadcrumb: 'Users Viewkyc',
        }
      },
      {
        path: 'transactions-list',
        component: TransactionsListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Transactions List',
          breadcrumb: 'Transactions List',
        }
      },
      {
        path: 'transactions-details/:_id',
        component: TransactionsViewComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Transactions View',
          breadcrumb: 'Transactions View',
        }
      },
      {
        path: 'staking-history-list',
        component: StakingHistoryListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Staking History',
          breadcrumb: 'Staking History',
        }
      },
      {
        path: 'staking-details/:_id',
        component: StakingHistoryViewComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Staking View',
          breadcrumb: 'Staking View',
        }
      },
      {
        path: 'trade-history',
        component: TradeHistoryComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Trade History',
          breadcrumb: 'Trade History',
        }
      },
      {
        path: 'user-TradeTds',
        component: userTradeTdsComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Trade Tds History',
          breadcrumb: 'Trade Tds History',
        }
      },
      {
        path: 'order-history',
        component: OrderHistoryComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Order History',
          breadcrumb: 'Order History',
        }
      },
      {
        path: 'adminactivitylog',
        component: AdminactivityComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Admin Activity',
          breadcrumb: 'Admin Activity',
        }
      },
      {
        path: 'site-settings',
        component: SiteSettingFormComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Site Settings',
          breadcrumb: 'Site Settings',
        }
      },
      {
        path: 'p2p-orders-list',
        component: P2POrderListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'P2P Orders',
          breadcrumb: 'P2P Orders',
        }
      },
      {
        path: 'p2p-orders-view/:_id',
        component: P2POrdersViewComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'P2P Orders View',
          breadcrumb: 'P2P Orders View',
        }
      },
      {
        path: 'p2p-settings',
        component: P2PSettingFormComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'P2P Settings',
          breadcrumb: 'P2P Settings',
        }
      },
      {
        path: 'p2p-report',
        component: P2PReportListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'P2P Report',
          breadcrumb: 'P2P Report',
        }
      },
      {
        path: 'p2p-report-details/:_id',
        component: P2PReportViewComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'P2P Report',
          breadcrumb: 'P2P Report',
        }
      },
      {
        path: 'p2p-blocked-users',
        component: P2PBlockedUsersListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'P2P Blocked Users',
          breadcrumb: 'P2P Blocked Users',
        }
      },
      {
        path: 'p2p-feedback-list',
        component: P2PFeedBackListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'P2P Blocked Users',
          breadcrumb: 'P2P Blocked Users',
        }
      },
      {
        path: 'p2p-feedback-details/:_id',
        component: P2PFeedBackViewComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'P2P Blocked Users',
          breadcrumb: 'P2P Blocked Users',
        }
      },
      {
        path: 'admin-bank',
        component: AdminBankFormComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Admin Bank Details',
          breadcrumb: 'Admin Bank Details',
        }
      },
      {
        path: 'my-profile',
        component: MyProfileFormComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'My Profile',
          breadcrumb: 'My Profile',
        }
      },
      {
        path: 'blogs',
        component: DocsComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Blogs',
          breadcrumb: 'Blogs',
        }
      },
      {
        path: 'blogs/:_id',
        component: DocsFormComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Blogs',
          breadcrumb: 'Blogs',
        }
      },
      {
        path: 'futures-subacc',
        component: FuturesSubaccListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Futures Subacc',
          breadcrumb: 'Futures Subacc',
        }
      },
      {
        path: 'futures-subacc-details/:_id',
        component: FuturesSubaccViewComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Futures Subacc View',
          breadcrumb: 'Futures Subacc View',
        }
      },
      {
        path: 'news-letter',
        component: NewsLetterComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'News Letter',
          breadcrumb: 'News Letter',
        }
      },
      {
        path: 'push-notification',
        component: PushnotificationComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Push Letter',
          breadcrumb: 'Push Letter',
        }
      }
      ,
      {
        path: 'staking-enable',
        component: stakeenableduserComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Stake Enable',
          breadcrumb: 'Stake Enable',
        }
      },

      {
        path: 'user-Balance-Set',
        component: userBalanceSetComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'user-Balance-Set',
          breadcrumb: 'Manual Balance Updation',
        }
      },
      {
        path: 'user-Balance-Set-View',
        component: UserBalanceSetViewComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'user-Balance-Set-View',
          breadcrumb: 'Manual User Balance',
        }
      },

      {
        path: 'p2p-transaction-history-list',
        component: P2PTransactionHistoryListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'P2P Transaction List',
          breadcrumb: 'P2P Transaction List',
        }
      },
      {
        path: 'p2p-transaction-details/:_id',
        component: P2PTransactionHistoryViewComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Staking View',
          breadcrumb: 'Staking View',
        }
      },
      {
        path: 'p2p-appeal-history-list',
        component: P2PAppealHistoryListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'P2P Transaction List',
          breadcrumb: 'P2P Transaction List',
        }
      },
      {
        path: 'p2p-appeal-details/:_id',
        component: P2PAppealHistoryViewComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Staking View',
          breadcrumb: 'Staking View',
        }
      },
      {
        path: 'faq-list',
        component: FAQListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Faq List',
          breadcrumb: 'Faq List',
        }
      },
      {
        path: 'buyorder-list',
        component: BuyorderListComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Buyorder Transaction List',
          breadcrumb: 'Buyorder Transaction List',
        }
      },
      {
        path: 'buyorder-view/:_id',
        component: BuyorderViewComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Buyorder View',
          breadcrumb: 'Buyorder View',
        }
      },
      {
        path: 'futures-usdt-move',
        component: FuturesUsdtMoveViewComponent,
        data: {
          roles: ['7de0f78bf6a4dc57ad7a913f64ad7b49'],
          title: 'Futures Usdt Move',
          breadcrumb: 'Futures Usdt Move',
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorRoutingModule { }
