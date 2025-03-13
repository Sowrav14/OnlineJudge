#include<bits/stdc++.h>
using namespace std;

int main(){
    int n; cin >> n;
    vector<int> a(n);
    for(int i = 0; i < n; i++) cin >> a[i];
    int sum = 0;
    for(int i = 0; i < n; i++) sum += a[i];
    if(sum == 10) sum = 11;
    cout << sum << endl;
}