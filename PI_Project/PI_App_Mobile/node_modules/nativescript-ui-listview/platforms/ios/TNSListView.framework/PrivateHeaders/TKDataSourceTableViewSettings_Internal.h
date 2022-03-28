//
//  TKDataSourceTableViewSettings_Internal.h
//  TelerikUI
//
//  Copyright (c) 2015 Telerik. All rights reserved.
//
#import "TKDataSourceTableViewSettings.h"

@class TKDataSourceGroup;
@class TKRLVDataSource;

@interface TKDataSourceTableViewSettings ()

- (void)ds_initCell:(UITableViewCell*)cell withItem:(id)item atIndexPath:(NSIndexPath*)indexPath
            inGroup:(TKDataSourceGroup*)group fromDataSource:(TKRLVDataSource*)dataSource  inTableView:(UITableView*)tableView;

- (UITableViewCell*)ds_cellForItem:(id)item atIndexPath:(NSIndexPath*)indexPath inGroup:(TKDataSourceGroup*)group inTableView:(UITableView*)tableView;

@end