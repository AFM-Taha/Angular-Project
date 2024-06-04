import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../_shared/material/material.module';
import { AdministratorComponent } from './administrator.component';
import { SharedModule } from '../_shared/shared.module';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { LayoutsModule } from './layouts/layouts.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { WalletBalanceModule } from './wallet-balance/wallet-balance.module';
import { CurrencyModule } from './currency/currency.module';
import { StakingModule } from './staking/staking.module';
import { StakingHistoryModule } from './staking-history/staking-history.module';
import { SubAdminModule } from './sub-admin/sub-admin.module';
import { PairsModule } from './pairs/pairs.module';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TradeHistoryModule } from './trade-history/trade-history.module';
import { OrderHistoryModule } from './order-history/order-history.module';
import { AdminactivityModule } from './admin-activity/admin-activity.module'
import { SiteSettingsModule } from './site-settings/site-settings.module';
import { AdminBankModule } from './admin-bank/admin-bank.module';
import { MyProfileModule } from './my-profile/my-profile.module';
import { ApiDocsModule } from './api-docs/api-docs.module';
import { NewsLetterModule } from './news-letter/news-letter.module';
import { StakingReferralModule } from './stakingReferralCommission/staking-referral.module';
import { usersviewkyc } from './userAutoKyc/usersviewkyc.module';
import { PushnotificationModule } from './push-notification/push-notification.module';
import { stakeenableduserModule } from './stake-enabled-user/stake-enabled-user.module';
import { P2PTransactionModule } from './p2p-transaction-history/p2p-transaction-history.module';
import { P2PAppealModule } from './p2p-appeal-history/p2p-appeal-history.module';
import { userTradeTdsModule } from './user-TradeTds/user-TradeTds.module';
import { P2PSettingsModule } from './p2p-settings/p2p-settings.module';
import { P2PReportModule } from './p2p-report/p2p-report-list.module';
import { P2POrderModule } from './p2p-orders/p2p-orders.module';
import { P2PBlockedUsersModule } from './p2p-blocked-users/p2p-blocked-users-list.module';
import { P2PFeedbackModule } from './p2p-feedback/p2p-feedback-list.module';
import { FaqModule } from './faq/faq.module';
import { P2PPairsModule } from './p2p-pairs/p2p-pairs.module';
import { CmsModule } from './cms/cms.module';
import { DerivativesPairsModule } from './derivatives-pairs/derivatives.module';
import { EmailTemplateModule } from './email-template/email-template.module';
import { userBalanceSetModule } from './user-Balance-Set/user-Balance-Set.module';
import { userBalanceSetViewModule } from './user-Balance-Set-View/admin-activity/user-Balance-Set-View.module';
import { BuyorderViewComponent } from './buyorder/buyorder-view/buyorder-view.component';
import { BuyorderListComponent } from './buyorder/buyorder-list/buyorder-list.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FuturesSubaccModule } from './futures-subacc/futures-subacc.module';
import { FuturesUsdtMoveModule } from './futures-usdt-move/transactions.module';

@NgModule({
  declarations: [AdministratorComponent, BuyorderViewComponent, BuyorderListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    AdministratorRoutingModule,
    LayoutsModule,
    DashboardModule,
    WalletBalanceModule,
    CurrencyModule,
    StakingModule,
    usersviewkyc,
    StakingHistoryModule,
    SubAdminModule,
    PairsModule,
    UsersModule,
    TransactionsModule,
    TradeHistoryModule,
    OrderHistoryModule,
    SiteSettingsModule,
    P2PSettingsModule,
    AdminBankModule,
    MyProfileModule,
    ApiDocsModule,
    NewsLetterModule,
    AdminactivityModule,
    StakingReferralModule,
    PushnotificationModule,
    stakeenableduserModule,
    P2POrderModule,
    P2PTransactionModule,
    P2PAppealModule,
    P2PReportModule,
    P2PFeedbackModule,
    P2PBlockedUsersModule,
    FaqModule,
    P2PPairsModule,
    CmsModule,
    DerivativesPairsModule,
    EmailTemplateModule,
    userTradeTdsModule,
    userBalanceSetModule,
    userBalanceSetViewModule,
    ClipboardModule,
    FuturesSubaccModule,
    FuturesUsdtMoveModule
  ],
  exports: [],
})
export class AdministratorModule { }
