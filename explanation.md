# firebase-app-sample

- Firebase Authentication
- Cloud Firestore
- Firebase Hosting

## 特徴

- 認証、バックエンドの開発いらずで Web アプリの開発が可能。
- 各 firebase のサービスは firebaseSDK を使用しクライアントから直接アクセスできる。

## Firebase Authentication

- ユーザー認証し情報をクラウドで保存できる。
- メールアドレス、パスワード、フェデレーション ID プロバイダーを使用した認証が可能。
- 認証情報取得後、Firebase Authentication SDK に認証情報が渡される。
- 認証情報を使用してデータへのアクセスを制限できる。
  [概要](https://firebase.google.com/docs/auth?hl=ja)

## Cloud Firestore

- Datastore の後続の製品
- NoSQL ドキュメント指向でスキーマレスなデータベース。
- 拡張性が高い。
- データは「ドキュメント」に格納し、「コレクション」にまとめられる。
- セキュリティルールでデータにアクセス制限をかけられる。
- リアルタイムでの受信が可能。
- オフラインサポートあり。
  [概要](https://firebase.google.com/docs/firestore?hl=ja)

```
users: [
  {
    id: 1,
    name: "user1",
    posts: [
      {
        id: 1,
        title: "title1",
        body: "body1"
        userId: 1,
        userName: "user1"
      },
    ]
  },
  {
    id: 2,
    name: "user2",
    age: 30
  }
],
posts: [
    {
      id: 1,
      title: "title2",
      body: "body2",
      userId: 2,
    },
  ]
```

### 料金

| 無料枠                    | 割り当て  |
| ------------------------- | --------- |
| 保存データ                | 1 GiB     |
| ドキュメントの読み取り    | 50,000/日 |
| ドキュメントの書き込み    | 20,000/日 |
| ドキュメントの削除        | 20,000/日 |
| 下り(外向き) ネットワーク | 10 GiB/月 |

[課金概要](https://firebase.google.com/docs/firestore/pricing?hl=ja)

### できないこと・デメリット

- 全文検索ができない(外部の検索サービスの利用推奨)。
- 結合できない。
- 集約関数はサポートされていない(Cloud Function の組み合わせが必要)。
- 設計の観点がいろいろ(正規化 or 非正規化,リレーションの与え方)。
  [リレーションの種類参考](https://qiita.com/1amageek/items/d606dcee9fbcf21eeec6#%E3%83%AA%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%B7%E3%83%83%E3%83%97%E3%81%AE%E7%A8%AE%E9%A1%9E)

### アプリ案

- 在席表
- 社内情報共有
